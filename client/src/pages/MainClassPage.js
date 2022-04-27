import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useMessage } from '../hooks/message.hook'
import { getUserData } from '../redux/apiUser'
import { ClassAction } from '../redux/apiClass'
import { getStatusData } from '../redux/apiStatus'
import { getHomeworksData } from '../redux/apiHomework'
import { getNewsData } from '../redux/apiNews'
import { getStudentData } from '../redux/apiStudents'
import { Student_rate_list } from '../components/Student_rate_list'
import { Teacher_news_list } from '../components/Teacher_news_list'
import { Student_grade_list } from '../components/Student_grade_list'
import { Progress_Chart_student } from '../components/Progress_Chart_student'
import { Attendance_Chart_student } from '../components/Attendance_Chart_student'
import { getLanguageData } from '../redux/apiLanguage'
import MainComponent from '../components/MainComponent'
import Loader from '../components/Loader'
import { currentLengthHadnler } from '../handlers/currentLengthHadnler'
import { reviewedLengthHadnler } from '../handlers/reviewedLengthHadnler'
import { checkingLengthHadnler } from '../handlers/checkingLengthHadnler'
import { expiredLengthHandler } from '../handlers/expiredLengthHadnler'
import { languageHandler } from '../handlers/languageHandler'
import '../style/MainClassPage.css'

const MainClassPage = () => {
  const dispatch = useDispatch()
  const message = useMessage()
  const { currentUser } = useSelector((state) => state.user)
  const { userId } = useSelector((state) => state.auth)
  const { currentHomeworks } = useSelector((state) => state.homeworks)
  const { currentStudent, currentStudentChart } = useSelector(
    (state) => state.student,
  )
  const { currentLang } = useSelector((state) => state.language)
  const { objects } = useSelector((state) => state.status)
  const { messages } = useSelector((state) => state.news)
  const id = window.location.pathname.split('/')[2]

  const deleteHandler = async (e) => {
    const name = e.target.getAttribute('data-news')
    await getNewsData(dispatch, { id: userId, class_: id, name }, 'DELETE_NEWS')
    await getStudentData(
      dispatch,
      { class_: id, id: userId, user: currentUser[0].role },
      'GET_STUDENT_DATA',
    )
  }

  useEffect(() => {
    if (messages) {
      message(messages.message, messages.flag, currentLang)
      const fetch = async () => {
        await getNewsData(dispatch, '', 'CLEAR_MESSAGE')
      }
      fetch()
    }
  }, [messages, message, dispatch])

  useEffect(() => {
    if (userId && id) {
      const fetch = async () => {
        await getLanguageData(dispatch, {}, 'GET_LANGUAGE')
        await getUserData(dispatch, userId, 'GET_USER_DATA')
        await getHomeworksData(dispatch, { id, link: userId }, 'GET_HOMEWORKS')
        await ClassAction(dispatch, { id }, 'GET_CLASS_DATA')
        await getStudentData(
          dispatch,
          { class_: id, id: userId, user: currentUser[0].role },
          'GET_STUDENT_DATA',
        )
        await getStatusData(
          dispatch,
          { student: userId, object: 'HOMEWORK', class_: id },
          'GET_STATUS',
        )
        await getStudentData(
          dispatch,
          { class_: id, id: userId, user: currentUser[0].role },
          'GET_CHART_STUDENT',
        )
      }
      fetch()
    }
  }, [dispatch, userId, id])

  return (
    <div>
      {currentUser &&
      currentHomeworks &&
      currentStudent &&
      currentStudentChart &&
      currentHomeworks.findHomeworks ? (
        <>
          <MainComponent currentUser={currentUser} id={id} />
          <div className="main-block">
            <div className="main-block-first">
              <div className="main-block-first-homework">
                <div className="main-block-first-homework-text">
                  <div className="main-block-first-homework-text_first">
                    {languageHandler(currentLang, 'MainClassPage_homework')}
                  </div>
                  <NavLink
                    to={window.location.pathname + '/homeworks'}
                    className="main-block-first-homework-text_second"
                  >
                    {languageHandler(currentLang, 'MainClassPage_more')}
                    <i class="bx bx-chevron-right"></i>
                  </NavLink>
                </div>
                <hr></hr>
                <div className="main-block-first-homework-all">
                  <div className="main-block-first-homework-all_numbers">
                    {currentHomeworks.findHomeworks.length}
                  </div>
                  <div className="main-block-first-homework-all_text">
                    {languageHandler(currentLang, 'MainClassPage_assigment')}
                  </div>
                </div>
                {currentUser[0].role === 'Student' ? (
                  <div className="main-block-first-homework-assigments_info">
                    <div className="main-block-first-homework-assigments_info-current">
                      <div className="main-block-first-homework-assigments_info-number current">
                        {currentLengthHadnler(
                          currentHomeworks.findHomeworks.length,
                          objects,
                        )}
                      </div>
                      <div className="main-block-first-homework-assigments_info-status">
                        {languageHandler(currentLang, 'Current')}
                      </div>
                    </div>
                    <div className="main-block-first-homework-assigments_info-reviewed">
                      <div className="main-block-first-homework-assigments_info-number reviewed">
                        {reviewedLengthHadnler(objects)}
                      </div>
                      <div className="main-block-first-homework-assigments_info-status">
                        {languageHandler(currentLang, 'Reviewed')}
                      </div>
                    </div>
                    <div className="main-block-first-homework-assigments_info-under_review">
                      <div className="main-block-first-homework-assigments_info-number under_review">
                        {checkingLengthHadnler(objects)}
                      </div>
                      <div className="main-block-first-homework-assigments_info-status">
                        {languageHandler(currentLang, 'Checking')}
                      </div>
                    </div>
                    <div className="main-block-first-homework-assigments_info-expired ">
                      <div className="main-block-first-homework-assigments_info-number expired">
                        {expiredLengthHandler(objects)}
                      </div>
                      <div className="main-block-first-homework-assigments_info-status">
                        {languageHandler(currentLang, 'Expired')}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="main-block-first-homework-assigments_info-teacher">
                    <div className="main-block-first-homework-assigments_info-current">
                      <div className="main-block-first-homework-assigments_info-number under_review">
                        {checkingLengthHadnler(objects)}
                      </div>
                      <div className="main-block-first-homework-assigments_info-status">
                        {languageHandler(currentLang, 'Checking')}
                      </div>
                    </div>
                    <div className="main-block-first-homework-assigments_info-reviewed">
                      <div className="main-block-first-homework-assigments_info-number reviewed">
                        {reviewedLengthHadnler(objects)}
                      </div>
                      <div className="main-block-first-homework-assigments_info-status">
                        {languageHandler(currentLang, 'Reviewed')}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="main-block-first-rating">
                <div className="main-block-first-rating-text">
                  <div className="main-block-first-rating-text_first">
                    {languageHandler(currentLang, 'MainClassPage_leaders')}
                  </div>

                  <hr></hr>
                </div>

                <Student_rate_list users={currentStudent.students} />
              </div>
              <div className="main-block-first-grade">
                <div className="main-block-first-grade-text">
                  <div className="main-block-first-grade-text_first">
                    {currentStudent.grades ? (
                      <>
                        {' '}
                        {languageHandler(currentLang, 'MainClassPage_rewards')}
                      </>
                    ) : (
                      <>{languageHandler(currentLang, 'MainClassPage_news')}</>
                    )}
                  </div>
                  <hr></hr>
                </div>

                {currentStudent.grades ? (
                  <Student_grade_list
                    grades={currentStudent.grades}
                    currentLang={currentLang}
                  />
                ) : (
                  <Teacher_news_list
                    news={currentStudent.news}
                    deleteHandler={deleteHandler}
                    currentLang={currentLang}
                  />
                )}
              </div>
            </div>
            <div className="main-block-second">
              <div className="main-block-second-progress">
                <div className="main-block-second-progress-text">
                  <div className="main-block-second-progress-text_first">
                    {languageHandler(currentLang, 'MainClassPage_progress')}
                  </div>
                  <NavLink
                    to={window.location.pathname + '/progress'}
                    className="main-block-second-progress-text_second"
                  >
                    {languageHandler(currentLang, 'MainClassPage_more')}
                    <i className="bx bx-chevron-right"></i>
                  </NavLink>
                </div>
                <hr></hr>
                <div className="main-block-second-progress-avarage">
                  {currentUser[0].role === 'Teacher' ? (
                    <>
                      {' '}
                      {languageHandler(
                        currentLang,
                        'MainClassPage_avarage-grade-tc',
                      )}
                      :{' '}
                    </>
                  ) : (
                    <>
                      {' '}
                      {languageHandler(
                        currentLang,
                        'MainClassPage_avarage-grade',
                      )}
                      :{' '}
                    </>
                  )}
                  <span>{currentStudentChart.AvarageGrade}</span>
                </div>
                <canvas
                  id="progress_chart"
                  className="main-block-second-progress-chart"
                />
                <Progress_Chart_student
                  data_st={currentStudentChart.chartGrade}
                  currentLang={currentLang}
                />
              </div>
              <div className="main-block-second-attendance">
                <div className="main-block-second-attendance-text">
                  <div className="main-block-second-attendance-text_first">
                    {languageHandler(currentLang, 'MainClassPage_attendance')}
                  </div>
                </div>
                <hr></hr>
                <div className="main-block-second-attedance-avarage">
                  {currentUser[0].role === 'Teacher' ? (
                    <>
                      {' '}
                      {languageHandler(
                        currentLang,
                        'MainClassPage_avarage-attendance-tc',
                      )}
                      :{' '}
                    </>
                  ) : (
                    <>
                      {' '}
                      {languageHandler(
                        currentLang,
                        'MainClassPage_avarage-attendance',
                      )}
                      :{' '}
                    </>
                  )}

                  <span>
                    {currentStudentChart.AvarageAttendance
                      ? currentStudentChart.AvarageAttendance + '%'
                      : currentStudentChart.AvarageAttendance}
                  </span>
                </div>
                <canvas
                  id="attendance_chart"
                  className="main-block-second-attendance-chart"
                />
                <Attendance_Chart_student
                  data_st={currentStudentChart.chartAttendance}
                  currentLang={currentLang}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default MainClassPage
