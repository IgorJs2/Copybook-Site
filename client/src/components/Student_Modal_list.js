import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStudentData } from '../redux/apiStudents'
import { languageHandler } from '../handlers/languageHandler'

const Student_Modal_list = ({ id, close, currentLang }) => {
  const dispatch = useDispatch()
  const { userId } = useSelector((state) => state.auth)
  const { studentList } = useSelector((state) => state.student)

  useEffect(() => {
    if (userId && id) {
      const fetch = async () => {
        await getStudentData(dispatch, id, 'GET_STUDENT')
      }
      fetch()
    }
  }, [dispatch, userId, id])

  const [student, setStudent] = useState([])

  let timeArray = []

  const chooseHandler = async (event) => {
    if (student.length !== 0) {
      if (student.some((elem) => elem === event.target.firstChild.data)) {
        setStudent((student) =>
          student.filter((element) => element !== event.target.firstChild.data),
        )
        event.target.parentElement.style.backgroundColor = '#79BBF9'
      } else {
        setStudent((student) => [...student, event.target.firstChild.data])
        event.target.parentElement.style.backgroundColor = '#66D9BD'
      }
    } else {
      setStudent((student) => [...student, event.target.firstChild.data])
      event.target.parentElement.style.backgroundColor = '#66D9BD'
    }
  }

  const submitHandler = async () => {
    if (timeArray !== []) {
      setStudent([...timeArray])
      await getStudentData(dispatch, student, 'SET_STUDENT')
    }
    close()
  }

  return (
    <div className="student-block">
      {studentList && studentList.students ? (
        <div className="student-block">
          {studentList.students.map((elem, i) => {
            return (
              <div className="student-block-main">
                <div
                  className="student-block-main-name"
                  onClick={chooseHandler}
                >
                  {elem}
                </div>
                <button className="grade-popup-button" onClick={submitHandler}>
                  {languageHandler(currentLang, 'Submit')}
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Student_Modal_list
