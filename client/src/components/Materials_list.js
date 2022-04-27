import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../style/MaterialsClassPage.css'
import FILE_DOWNLOAD from './File_Download'
import Loader from './Loader'
import { getStatusData } from '../redux/apiStatus'

const Materials_list = ({
  id,
  status,
  UI,
  currentMaterials,
  objects,
  currentLang,
}) => {
  const dispatch = useDispatch()
  const { userId } = useSelector((state) => state.auth)

  const changeStatusHandler = async (event) => {
    if (event.target.getAttribute('id')) {
      await getStatusData(
        dispatch,
        {
          student: userId,
          object: event.target.getAttribute('id'),
          status: 'VIEWED',
          type: 'MATERIAL',
          class_: id,
        },
        'SET_STATUS',
      )
    }
  }

  return (
    <>
      {currentMaterials && currentMaterials.findMaterials ? (
        <div className={'materials-block-main' + ' ' + UI}>
          {currentMaterials.findMaterials.map((elem, i) => {
            let check = false

            objects.map((stat) => {
              if (stat.name === elem.name) {
                check = true
              }
            })

            if ((check && status === 'VIEWED') || status === 'SENDED') {
              return (
                <div className="materials-block-main-post">
                  <div className="materials-block-main-name" key={elem._id}>
                    {elem.name}
                  </div>
                  <div className="materials-block-main-file">
                    <FILE_DOWNLOAD
                      src={elem.filename}
                      UI={'materials-file-downloader'}
                      currentLang={currentLang}
                    />
                  </div>
                  <div className="materials-block-main-data viewed">
                    {elem.date}
                  </div>
                </div>
              )
            }
            if (!check && status === 'CURRENT') {
              return (
                <div className="materials-block-main-post">
                  <div className="materials-block-main-name" key={elem._id}>
                    {elem.name}
                  </div>
                  <div className="materials-block-main-file not-padding">
                    <FILE_DOWNLOAD
                      src={elem.filename}
                      UI={'materials-file-downloader'}
                      currentLang={currentLang}
                    />
                  </div>
                  <div className="materials-block-main-data current">
                    {elem.date}
                    <i
                      className="bx bx-chevron-down"
                      id={elem._id}
                      onClick={changeStatusHandler}
                    ></i>
                  </div>
                </div>
              )
            }

            return <></>
          })}
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Materials_list
