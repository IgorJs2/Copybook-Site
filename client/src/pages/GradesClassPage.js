import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useMessage } from '../hooks/message.hook'
import { useModal } from 'react-hooks-use-modal'
import { useDispatch } from 'react-redux'
import { getUserData } from '../redux/apiUser'
import { getGradesData } from '../redux/apiGrades'
import { getAttendanceData } from '../redux/apiAttendance'
import { getLanguageData } from '../redux/apiLanguage'
import { languageHandler } from '../handlers/languageHandler'
import { changeHandler } from '../handlers/changeHandler'
import Loader from '../components/Loader'
import NotFound from '../components/NotFound'
import STUDENT_MODAL_LIST from '../components/Student_Modal_list'
import STUDENT_LIST from '../components/Student_list'
import MainComponent from '../components/MainComponent'
import Select from 'react-select'
import { customStylesForSelect } from '../style/SelectStyle'
import '../style/GradesClassPage.css'

const GradesClassPage = () => {
  const dispatch = useDispatch()
  const message = useMessage()
  const [Modal, open, close] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: true,
  })
  const { userId } = useSelector((state) => state.auth)
  const { currentUser } = useSelector((state) => state.user)
  const { currentLang } = useSelector((state) => state.language)
  const { messages } = useSelector((state) => state.grades)
  const { choosenStudent } = useSelector((state) => state.student)

  const id = window.location.pathname.split('/')[2]

  const optionsAttendance = [
    {
      value: true,
      label: languageHandler(currentLang, 'Yes'),
      name: 'attendance',
    },
    {
      value: false,
      label: languageHandler(currentLang, 'No'),
      name: 'attendance',
    },
  ]

  const optionsType = [
    {
      value: 'CLASSWORK',
      label: languageHandler(currentLang, 'Classwork'),
      name: 'type',
    },
    {
      value: 'TEST',
      label: languageHandler(currentLang, 'Tests'),
      name: 'type',
    },
    {
      value: 'LABS',
      label: languageHandler(currentLang, 'Labworks'),
      name: 'type',
    },
    {
      value: 'EXAMINATION',
      label: languageHandler(currentLang, 'Exams'),
      name: 'type',
    },
    {
      value: 'PRACTICAL',
      label: languageHandler(currentLang, 'Practical'),
      name: 'type',
    },
  ]

  const [form, setForm] = useState({
    grade: '',
    attendance: null,
    type: '',
    description: '',
    date: '',
  })

  useEffect(() => {
    if (userId) {
      const fetch = async () => {
        await getLanguageData(dispatch, {}, 'GET_LANGUAGE')
        await getUserData(dispatch, userId, 'GET_USER_DATA')
      }
      fetch()
    }
  }, [dispatch, userId])

  useEffect(() => {
    if (messages) {
      message(messages.message, messages.flag, currentLang)
      const fetch = async () => {
        await getGradesData(dispatch, '', 'CLEAR_MESSAGE')
      }
      fetch()
    }
  }, [messages, message, dispatch])

  const submitHandler = async () => {
    try {
      await getGradesData(
        dispatch,
        { ...form, choosenStudent, class_: id },
        'CREATE_GRADE',
      )
      if (form.attendance && choosenStudent[0]) {
        await getAttendanceData(
          dispatch,
          { id: userId, class_: id, date: form.date },
          'SET_ATTENDANCE',
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {currentUser && currentUser[0] ? (
        <div>
          {currentUser[0].role === 'Teacher' ? (
            <>
              <MainComponent currentUser={currentUser} id={id} />
              <div className="grade-add-block">
                <div className="grade-form-block">
                  <div className="grade-block-students">
                    {languageHandler(currentLang, 'Students')}:
                  </div>
                  {choosenStudent && choosenStudent[0] ? (
                    <>
                      <STUDENT_LIST students={choosenStudent} />
                    </>
                  ) : (
                    <div type="text" className="grade-chooseform-student">
                      <i class="bx bx-down-arrow" onClick={open}></i>
                      <Modal>
                        <div className="grade-popup-block">
                          <STUDENT_MODAL_LIST
                            id={id}
                            close={close}
                            currentLang={currentLang}
                          />
                        </div>
                      </Modal>
                    </div>
                  )}
                  <div className="grade-block-attendance">
                    {languageHandler(currentLang, 'Attendance')}:
                  </div>
                  <div className="grade-chooseform-attendance">
                    <Select
                      options={optionsAttendance}
                      onChange={(e) => {
                        changeHandler(setForm, form, e)
                      }}
                      styles={customStylesForSelect}
                      placeholder={languageHandler(currentLang, 'None')}
                      autosize={true}
                    />
                  </div>
                  <div className="grade-block-grade">
                    {languageHandler(currentLang, 'Grade')}:
                  </div>
                  <input
                    type="text"
                    className="grade-block-grade-input"
                    name="grade"
                    onChange={(e) => {
                      changeHandler(setForm, form, e)
                    }}
                  ></input>
                  <div className="grade-block-grade">
                    {languageHandler(currentLang, 'Type')}:
                  </div>

                  <div className="grade-chooseform-attendance">
                    <Select
                      options={optionsType}
                      onChange={(e) => {
                        changeHandler(setForm, form, e)
                      }}
                      styles={customStylesForSelect}
                      placeholder={languageHandler(currentLang, 'None')}
                      autosize={true}
                    />
                  </div>
                  <div className="grade-block-date">
                    {languageHandler(currentLang, 'Date')}:
                  </div>
                  <div className="grade-block-date-input">
                    <input
                      type="date"
                      className="grade-block-date-input-field"
                      name="date"
                      onChange={(e) => {
                        changeHandler(setForm, form, e)
                      }}
                    ></input>
                  </div>

                  <div className="grade-block-description">
                    {languageHandler(currentLang, 'Description')}:
                  </div>
                  <input
                    type="text"
                    className="grade-block-description-input"
                    name="description"
                    onChange={(e) => {
                      changeHandler(setForm, form, e)
                    }}
                  ></input>

                  <button
                    className="grade-block-button"
                    onClick={submitHandler}
                  >
                    {languageHandler(currentLang, 'Submit')}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <NotFound />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default GradesClassPage
