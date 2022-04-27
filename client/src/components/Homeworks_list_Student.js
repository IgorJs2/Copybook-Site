import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from 'react-hooks-use-modal'
import { useMessage } from '../hooks/message.hook'
import { getStatusData } from '../redux/apiStatus'
import { getGradesData } from '../redux/apiGrades'
import { getFileData } from '../redux/apiFile'
import { languageHandler } from '../handlers/languageHandler'
import { chooseHandler } from '../handlers/chooseHandler'
import { homeworkChooseHandler } from '../handlers/homeworkChooseHandler'
import { filterHomeworkHandlerStudent } from '../handlers/filterHomeworkHandler'
import '../style/HomeworksClassPage.css'
import FILE_DOWNLOAD from './File_Download'
import { Homework_list_Student_Modal } from './Homework_list_Student_Modal'

const Homeworks_list_Student = ({
  id,
  currentHomeworks,
  status,
  objects,
  currentLang,
}) => {
  const dispatch = useDispatch()
  const message = useMessage()
  const { userId } = useSelector((state) => state.auth)
  const { messageFile, error } = useSelector((state) => state.file)

  const [Modal, open, close] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: true,
  })

  const [choosedHomework, setChoosedHomework] = useState()

  const [file, setFile] = useState({
    file: null,
  })

  useEffect(() => {
    if (file && file.file) {
      const fetch = async () => {
        await getFileData(dispatch, file, 'CREATE_FILE')
      }
      fetch()
      open()
    }
  }, [file, dispatch])

  useEffect(() => {
    if (error) {
      message(error.message, error.flag, currentLang)
    }
  }, [dispatch, error])

  const submitHandler = async (e) => {
    try {
      await getGradesData(
        dispatch,
        { student: userId, filename: messageFile, name: choosedHomework, id },
        'HOMEWORK_T0_RATE',
      )

      setFile({ ...file, file: null })
      await getStatusData(
        dispatch,
        { student: userId, object: 'HOMEWORK', class_: id },
        'GET_STATUS',
      )
      await getFileData(dispatch, {}, 'CLEAR_DATA')
      await getFileData(dispatch, {}, 'CLEAR_OTHER_FILE')

      close()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="homework-block-main">
      {messageFile ? (
        <Modal>
          <Homework_list_Student_Modal
            submitHandler={submitHandler}
            close={close}
            messageFile={messageFile}
            currentLang={currentLang}
          />
        </Modal>
      ) : (
        <></>
      )}

      {currentHomeworks.findHomeworks.map((elem, i) => {
        let { check, grade } = filterHomeworkHandlerStudent(
          objects,
          status,
          elem,
        )

        if (status === 'EXPIRED' && check) {
          return (
            <>
              <div
                className="homework-block-main-post"
                onMouseOver={(e) => {
                  homeworkChooseHandler(setChoosedHomework, e)
                }}
              >
                <div className="homework-block-main-name">{elem.name}</div>
                <div className="homework-block-main-file not-padding">
                  <FILE_DOWNLOAD
                    src={elem.filename}
                    UI={'homework-file-text'}
                    currentLang={currentLang}
                  />
                </div>
                <div className="homework-block-main-upload">
                  <label
                    className="homework-block-main-upload-label"
                    onChange={(e) => {
                      chooseHandler(setFile, file, e)
                      open()
                    }}
                    data-name={elem.name}
                  >
                    <input
                      type="file"
                      className="homework-block-main-upload-input file"
                      data-name={elem.name}
                    />
                    <i class="bx bxs-file-export" data-name={elem.name}></i>
                    <div data-name={elem.name}>
                      {languageHandler(currentLang, 'Upload')}
                    </div>
                  </label>
                </div>
                <div className="homework-block-main-data expired">
                  {elem.expire_date}
                </div>
              </div>
            </>
          )
        } else if (status === 'REVIEWED' && check) {
          return (
            <>
              <div className="homework-block-main-post">
                <div className="homework-block-main-name">{elem.name}</div>
                <div className="homework-block-main-st_grade">
                  <span>{grade}</span>
                </div>
                <div className="homework-block-main-data ">{elem.date}</div>
              </div>
            </>
          )
        } else if (status === 'CHECKING' && check) {
          return (
            <>
              <div className="homework-block-main-post">
                <div className="homework-block-main-name">{elem.name}</div>
                <div className="homework-block-main-st_grade">
                  {languageHandler(currentLang, 'Checking')}
                </div>
                <div className="homework-block-main-data ">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </>
          )
        } else if (!check && status === 'CURRENT') {
          return (
            <>
              <div
                className="homework-block-main-post"
                onMouseOver={(e) => {
                  homeworkChooseHandler(setChoosedHomework, e)
                }}
              >
                <div className="homework-block-main-name" key={elem._id}>
                  {elem.name}
                </div>
                <div className="homework-block-main-file not-padding">
                  <FILE_DOWNLOAD
                    src={elem.filename}
                    UI={'homework-file-text'}
                    currentLang={currentLang}
                  />
                </div>
                <div className="homework-block-main-upload">
                  <label
                    className="homework-block-main-upload-label"
                    onChange={(e) => {
                      chooseHandler(setFile, file, e)
                    }}
                    data-name={elem.name}
                  >
                    <input
                      type="file"
                      className="homework-block-main-upload-input"
                      data-name={elem.name}
                    />
                    <i class="bx bxs-file-export" data-name={elem.name}></i>
                    <div data-name={elem.name}>
                      {languageHandler(currentLang, 'Upload')}
                    </div>
                  </label>
                </div>
                <div
                  className="homework-block-main-data current"
                  id={elem.name}
                >
                  {languageHandler(currentLang, 'To')}: {elem.expire_date}
                </div>
              </div>
            </>
          )
        }
      })}
    </div>
  )
}

export default Homeworks_list_Student
