import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHomeworksData } from '../redux/apiHomework'
import { getGradesData } from '../redux/apiGrades'
import { getStatusData } from '../redux/apiStatus'
import { useMessage } from '../hooks/message.hook'
import { languageHandler } from '../handlers/languageHandler'
import { changeHandler } from '../handlers/changeHandler'
import '../style/HomeworksClassPage.css'
import FILE_DOWNLOAD from './File_Download'
import { filterHomeworkHandlerTeacher } from '../handlers/filterHomeworkHandler'

const Homeworks_list_Teacher = ({
  id,
  currentHomeworks,
  status,
  currentLang,
}) => {
  const dispatch = useDispatch()
  const message = useMessage()
  const { userId } = useSelector((state) => state.auth)
  const { objects } = useSelector((state) => state.status)
  const { messages } = useSelector((state) => state.grades)

  const [grade, setGrade] = useState({
    grade: null,
  })

  const submitHandler = async (event) => {
    try {
      const user = event.target.getAttribute('data-user')
      const name = event.target.getAttribute('data-name')
      if (grade.grade < 1 || grade.grade > 12) {
        message('[INFO] Enter grade from 1 to 12!', '#EAC15A', currentLang)
      } else if (grade.grade && user && name) {
        await getGradesData(
          dispatch,
          {
            choosenStudent: [user],
            grade: grade.grade,
            description: name,
            name_homework: name,
            student: userId,
            class_: id,
          },
          'ESTIMATE_HOMEWORK',
        )
        await getHomeworksData(dispatch, { id, link: userId }, 'GET_HOMEWORKS')
        await getStatusData(
          dispatch,
          { student: userId, object: 'HOMEWORK', class_: id },
          'GET_STATUS',
        )
      } else {
        message('[INFO] Enter grade please!', '#EAC15A', currentLang)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (messages) {
      message(messages.message, messages.flag, currentLang)
      const fetch = async () => {
        await getGradesData(dispatch, '', 'CLEAR_MESSAGE')
      }
      fetch()
    }
  }, [messages, message, dispatch])

  return (
    <div className="homework-block-main">
      {currentHomeworks.findHomeworks.map((elem, i) => {
        let { check, grade, copy } = filterHomeworkHandlerTeacher(
          objects,
          status,
          elem,
        )

        if (status === 'SENDED' && elem.expire_date !== 'NONE') {
          return (
            <div className="homework-block-main-post">
              <div className="homework-block-main-name" key={elem._id}>
                {elem.name}
              </div>
              <div className="homework-block-main-file_block">
                <FILE_DOWNLOAD
                  src={elem.filename}
                  UI={'homework-file-downloader'}
                />
              </div>
              <div className="homework-block-main-data">
                {languageHandler(currentLang, 'To')}: {elem.expire_date}
              </div>
            </div>
          )
        }
        if (status === 'CHECKING' && check && elem.student && !copy) {
          return (
            <>
              <div className="homework-block-main-post hover-block">
                <div className="homework-block-main-name" key={elem._id}>
                  {elem.name}
                </div>
                <div className="homework-block-main-file">
                  <FILE_DOWNLOAD
                    src={elem.filename}
                    UI={'homework-file-text'}
                  />
                </div>
                <div className="homework-block-main-grade">
                  <div className="homework-block-main-input-text">
                    {languageHandler(currentLang, 'Ent-grade')}:
                  </div>
                  <input
                    type="text"
                    name="grade"
                    className="homework-block-main-input"
                    onChange={(e) => {
                      changeHandler(setGrade, grade, e)
                    }}
                  />
                </div>
                <div
                  className="homework-block-main-data current"
                  data-name={elem.name}
                  data-user={elem.student}
                  onClick={submitHandler}
                >
                  <span>{elem.student}</span>
                </div>
              </div>
            </>
          )
        }
        if (status === 'REVIEWED' && check && elem.student) {
          return (
            <>
              <div className="homework-block-main-post">
                <div className="homework-block-main-name" key={elem._id}>
                  {elem.name}
                </div>
                <div
                  className="homework-block-main-st_grade"
                  data-name={elem.name}
                >
                  <span>{grade}</span>
                </div>
                <div className="homework-block-main-data ">{elem.student}</div>
              </div>
            </>
          )
        }
      })}
    </div>
  )
}

export default Homeworks_list_Teacher
