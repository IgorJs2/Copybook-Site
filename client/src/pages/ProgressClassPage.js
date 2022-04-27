import React, { useEffect, useState } from 'react'
import MainComponent from '../components/MainComponent'
import '../style/ProgressPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../redux/apiUser'
import { getStudentData } from '../redux/apiStudents'
import { ClassAction } from '../redux/apiClass'
import { getGradesData } from '../redux/apiGrades'
import { getLanguageData } from '../redux/apiLanguage'
import { languageHandler } from '../handlers/languageHandler'
import { filterModalOpenHandler } from '../handlers/filterModalOpenHandler'
import { filterGradeHandler } from '../handlers/filterGradeHandler'
import { showHandler } from '../handlers/showHandler'
import Loader from '../components/Loader'
import ProgressAll_Chart_student from '../components/ProgressAll_Chart_student'
import ProgressAll_grades_student_list from '../components/ProgressAll_grades_student_list'

const ProgressClassPage = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
  const { userId } = useSelector((state) => state.auth)
  const { currentGrades } = useSelector((state) => state.grades)
  const { currentLang } = useSelector((state) => state.language)
  const { currentStudentAllChart } = useSelector((state) => state.student)
  const id = window.location.pathname.split('/')[2]

  const [type, setType] = useState()
  const [search, setSearch] = useState()

  useEffect(() => {
    if (userId && id) {
      const fetch = async () => {
        await getLanguageData(dispatch, {}, 'GET_LANGUAGE')
        await getUserData(dispatch, userId, 'GET_USER_DATA')
        await ClassAction(dispatch, { id }, 'GET_CLASS_DATA')
        await getGradesData(
          dispatch,
          { id: userId, class_: id, user: currentUser[0].role },
          'GET_GRADES',
        )
        await getStudentData(
          dispatch,
          { class_: id, id: userId, user: currentUser[0].role },
          'GET_PRG_CHART_STUDENT',
        )
      }
      fetch()
    }
  }, [dispatch, userId, id])

  return (
    <div>
      {currentUser && currentStudentAllChart && currentStudentAllChart.data ? (
        <>
          <MainComponent currentUser={currentUser} id={id} />
          <div className="progress-block">
            <div className="progress-block-first">
              <div className="progress-block-first_text">
                <div className="progress-block-first_text_left">
                  {languageHandler(currentLang, 'ProgressPage_avarage-chart')}
                </div>
              </div>
              <hr></hr>
              <div className="progress-block-first-all">
                {currentUser[0].role === 'Student' ? (
                  <>
                    {languageHandler(currentLang, 'ProgressPage_avarage-gr')}:
                  </>
                ) : (
                  <>
                    {languageHandler(currentLang, 'ProgressPage_avarage-gr-tc')}
                    :
                  </>
                )}
                <span>
                  <span>&ensp;</span>
                  {currentStudentAllChart.avarage[6].all}
                </span>
              </div>

              <div className="progress-block-second-progressAll_chart">
                <canvas id="progressAll_chart" />
              </div>
              <ProgressAll_Chart_student
                data={currentStudentAllChart.data}
                avarage={currentStudentAllChart.avarage}
                currentLang={currentLang}
              />
            </div>

            <div className="progress-block-second">
              <div className="progress-block-second_text">
                <div className="progress-block-second_text-choose">
                  {languageHandler(currentLang, 'ProgressPage_work')}
                  <i
                    class="bx bx-chevron-down"
                    onClick={() => {
                      filterModalOpenHandler()
                    }}
                  ></i>
                </div>
                <input
                  className="progress-block-second-search_input"
                  placeholder={languageHandler(currentLang, 'Search')}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="progress-block-modal">
                <div
                  className="progress-block-modal-homework"
                  onClick={(e) => {
                    filterGradeHandler(setType, e)
                  }}
                >
                  <i class="bx bxs-right-arrow"></i>
                  <span data-type="homework">
                    {languageHandler(currentLang, 'Homeworks')}
                  </span>
                </div>
                <div
                  className="progress-block-modal-labs"
                  onClick={(e) => {
                    filterGradeHandler(setType, e)
                  }}
                >
                  <i class="bx bxs-right-arrow"></i>
                  <span data-type={'labs'}>
                    {languageHandler(currentLang, 'Labworks')}
                  </span>
                </div>
                <div
                  className="progress-block-modal-classwork"
                  onClick={(e) => {
                    filterGradeHandler(setType, e)
                  }}
                >
                  <i class="bx bxs-right-arrow"></i>
                  <span data-type={'classwork'}>
                    {languageHandler(currentLang, 'Classwork')}
                  </span>
                </div>
                <div
                  className="progress-block-modal-examinations"
                  onClick={(e) => {
                    filterGradeHandler(setType, e)
                  }}
                >
                  <i class="bx bxs-right-arrow"></i>
                  <span data-type={'examination'}>
                    {languageHandler(currentLang, 'Exams')}
                  </span>
                </div>
                <div
                  className="progress-block-modal-tests"
                  onClick={(e) => {
                    filterGradeHandler(setType, e)
                  }}
                >
                  <i class="bx bxs-right-arrow"></i>
                  <span data-type={'test'}>
                    {languageHandler(currentLang, 'Tests')}
                  </span>
                </div>
                <div
                  className="progress-block-modal-practical"
                  onClick={(e) => {
                    filterGradeHandler(setType, e)
                  }}
                >
                  <i class="bx bxs-right-arrow"></i>
                  <span data-type={'practical'}>
                    {languageHandler(currentLang, 'Practical')}
                  </span>
                </div>
                <div
                  className="progress-block-modal-all"
                  onClick={(e) => {
                    filterGradeHandler(setType, e)
                  }}
                >
                  <i class="bx bxs-right-arrow"></i>
                  <span data-type={'all'}>
                    {languageHandler(currentLang, 'All')}
                  </span>
                </div>
                {currentUser[0].role === 'Teacher' ? (
                  <div
                    className="progress-block-modal-all"
                    data-type={'attendance'}
                    onClick={(e) => {
                      filterGradeHandler(setType, e)
                    }}
                  >
                    <i class="bx bxs-right-arrow"></i>
                    <span data-type={'attendance'}>
                      {languageHandler(currentLang, 'Attendance')}
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <hr></hr>

              <ProgressAll_grades_student_list
                data={{ grades: currentGrades.data, type }}
                search={search}
                currentLang={currentLang}
                role={currentUser[0].role}
              />
            </div>

            <i
              class="bx bx-chevron-down btn not_show"
              onClick={(e) => {
                showHandler('PROGRESS')
              }}
            ></i>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default ProgressClassPage
