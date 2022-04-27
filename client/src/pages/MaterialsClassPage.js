import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getUserData } from '../redux/apiUser'
import { getMaterialsData } from '../redux/apiMaterial'
import { getStatusData } from '../redux/apiStatus'
import { getLanguageData } from '../redux/apiLanguage'
import { languageHandler } from '../handlers/languageHandler'
import { showHandler } from '../handlers/showHandler'
import Loader from '../components/Loader'
import MainComponent from '../components/MainComponent'
import MATERIALS_LIST from '../components/Materials_list'
import '../style/MaterialsClassPage.css'

const MaterialsClassPage = () => {
  const dispatch = useDispatch()
  const { userId } = useSelector((state) => state.auth)
  const { currentUser } = useSelector((state) => state.user)
  const { currentLang } = useSelector((state) => state.language)
  const { currentMaterials } = useSelector((state) => state.materials)
  const { objects } = useSelector((state) => state.status)
  const id = window.location.pathname.split('/')[2]

  useEffect(() => {
    if (userId) {
      const fetch = async () => {
        await getLanguageData(dispatch, {}, 'GET_LANGUAGE')
        await getUserData(dispatch, userId, 'GET_USER_DATA')
        await getMaterialsData(dispatch, id, 'GET_MATERIALS')
        await getStatusData(
          dispatch,
          { student: userId, object: 'MATERIAL', class_: id },
          'GET_STATUS',
        )
      }
      fetch()
    }
  }, [dispatch, userId])

  return (
    <div>
      {currentUser ? (
        <>
          <MainComponent currentUser={currentUser} id={id} />
          {currentUser[0].role === 'Student' ? (
            <div className="material-container">
              <div className="material-all-text">
                {currentMaterials &&
                currentMaterials.findMaterials &&
                objects ? (
                  <>
                    <div className="material-current-text">
                      {languageHandler(currentLang, 'Current')}:{' '}
                      {currentMaterials.findMaterials.length - objects.length}
                    </div>
                    <div className="material-materials-text">
                      {languageHandler(currentLang, 'All_materials')}:{' '}
                      {currentMaterials.findMaterials.length}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <MATERIALS_LIST
                id={id}
                status="CURRENT"
                UI={'not_showed_all'}
                currentMaterials={currentMaterials}
                objects={objects}
                currentLang={currentLang}
              />

              <div className="material-viewed-text">
                {languageHandler(currentLang, 'Viewed')}: {objects.length}
              </div>

              <MATERIALS_LIST
                id={id}
                status="VIEWED"
                UI={'not_showed_all'}
                currentMaterials={currentMaterials}
                objects={objects}
                currentLang={currentLang}
              />
              <div className="material-show">
                <i
                  class="bx bx-chevron-down btn not_show"
                  onClick={() => {
                    showHandler('MATERIAL')
                  }}
                ></i>
              </div>
            </div>
          ) : (
            <div className="material-container">
              <div className="material-all-text">
                {currentMaterials && currentMaterials.findMaterials ? (
                  <>
                    <div className="material-materials-text-teacher">
                      {languageHandler(currentLang, 'Sended_materials')}:{' '}
                      {currentMaterials.findMaterials.length}
                    </div>
                    <NavLink
                      to={window.location.pathname + '/add'}
                      className="material-add-button"
                    >
                      <div>{languageHandler(currentLang, 'Add_materials')}</div>
                    </NavLink>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <MATERIALS_LIST
                id={id}
                status="SENDED"
                currentMaterials={currentMaterials}
                objects={objects}
                currentLang={currentLang}
              />
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default MaterialsClassPage
