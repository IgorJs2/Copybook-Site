import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../redux/apiUser'
import { getStatusData } from '../redux/apiStatus'
import { getHomeworksData } from '../redux/apiHomework'
import { showHandler } from '../handlers/showHandler'
import { expiredLengthHandler } from '../handlers/expiredLengthHadnler'
import { checkingLengthHadnler } from '../handlers/checkingLengthHadnler'
import { reviewedLengthHadnler } from '../handlers/reviewedLengthHadnler'
import { getLanguageData } from '../redux/apiLanguage'
import { languageHandler } from '../handlers/languageHandler'
import Loader from '../components/Loader'
import MainComponent from '../components/MainComponent'
import HOMEWORKS_LIST_TEACHER from '../components/Homeworks_list_Teacher'
import HOMEWORKS_LIST_STUDENT from '../components/Homeworks_list_Student'
import '../style/HomeworksClassPage.css'
import { currentLengthHadnler } from '../handlers/currentLengthHadnler'

const HomeworksClassPage = () => {
  const dispatch = useDispatch()
  const { userId } = useSelector((state) => state.auth)
  const { currentUser } = useSelector((state) => state.user)
  const { currentLang } = useSelector((state) => state.language)
  const { currentHomeworks } = useSelector((state) => state.homeworks)
  const { objects } = useSelector((state) => state.status)
  const id = window.location.pathname.split('/')[2]

  useEffect(() => {
    if (userId && id) {
      const fetch = async () => {
        await getLanguageData(dispatch, {}, 'GET_LANGUAGE')
        await getUserData(dispatch, userId, 'GET_USER_DATA')
        await getHomeworksData(dispatch, { id, link: userId }, 'GET_HOMEWORKS')
        await getStatusData(
          dispatch,
          { student: userId, object: 'HOMEWORK', class_: id },
          'GET_STATUS',
        )
      }
      fetch()
    }
  }, [dispatch, userId, id])

  return (
    <div>
      {currentUser &&
      currentHomeworks &&
      currentHomeworks.findHomeworks &&
      currentUser[0] &&
      currentUser[0].role &&
      objects ? (
        <>
          <MainComponent currentUser={currentUser} id={id} />
          {currentUser[0].role === 'Student' ? (
            <div className="homework-block">
              <div className="homework-all-text">
                <div className="homework-current-text">
                  {languageHandler(currentLang, 'Current')}:{' '}
                  {currentLengthHadnler(
                    currentHomeworks.findHomeworks.length,
                    objects,
                  )}
                </div>
                <div className="homework-assigment-text">
                  {languageHandler(currentLang, 'All_assigment')}:{' '}
                  {currentHomeworks.findHomeworks.length}
                </div>
                <div className="homework-expired-text">
                  {languageHandler(currentLang, 'Expired')}:{' '}
                  {expiredLengthHandler(objects)}
                </div>
              </div>

              <div className="homework-block-list">
                <div className="homework-block-current">
                  <HOMEWORKS_LIST_STUDENT
                    currentHomeworks={currentHomeworks}
                    id={id}
                    status="CURRENT"
                    objects={objects}
                    currentLang={currentLang}
                  />
                </div>
                <div className="homework-block-expired">
                  <HOMEWORKS_LIST_STUDENT
                    currentHomeworks={currentHomeworks}
                    id={id}
                    status="EXPIRED"
                    objects={objects}
                    currentLang={currentLang}
                  />
                </div>
              </div>

              <div className="homework-all-text">
                <div className="homework-viewed-text">
                  {languageHandler(currentLang, 'Reviewed')}:{' '}
                  {reviewedLengthHadnler(objects)}
                </div>
                <div className="homework-checking-text">
                  {languageHandler(currentLang, 'Checking')}:{' '}
                  {checkingLengthHadnler(objects)}
                </div>
              </div>

              <div className="homework-block-list">
                <div className="homework-block-checked">
                  <HOMEWORKS_LIST_STUDENT
                    currentHomeworks={currentHomeworks}
                    id={id}
                    status="REVIEWED"
                    objects={objects}
                    currentLang={currentLang}
                  />
                </div>
                <div className="homework-block-checking">
                  <HOMEWORKS_LIST_STUDENT
                    currentHomeworks={currentHomeworks}
                    id={id}
                    status="CHECKING"
                    objects={objects}
                    currentLang={currentLang}
                  />
                </div>
              </div>
              <i
                class="bx bx-chevron-down btn not_show"
                onClick={(e) => {
                  showHandler('HOMEWORK')
                }}
              ></i>
            </div>
          ) : (
            <div className="homework-block">
              <div className="homework-all-text">
                {currentHomeworks && currentHomeworks.findHomeworks ? (
                  <>
                    <div className="homework-reviewed-text">
                      {languageHandler(currentLang, 'Checking-tc')}:{' '}
                      {checkingLengthHadnler(objects)}
                    </div>
                    <div className="homework-assigment-texts">
                      {languageHandler(currentLang, 'All_assigment')}:{' '}
                      {currentHomeworks.findHomeworks.length}
                    </div>
                    <NavLink
                      to={window.location.pathname + '/add'}
                      className="homework-add-button"
                    >
                      <div>
                        {languageHandler(currentLang, 'HomeworkClassPage_add')}
                      </div>
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to={window.location.pathname + '/add'}
                      className="homework-add-button"
                    >
                      <div>
                        {languageHandler(currentLang, 'HomeworkClassPage_add')}
                      </div>
                    </NavLink>
                  </>
                )}
              </div>

              <div className="homework-block-list">
                <div className="homework-block-current">
                  <HOMEWORKS_LIST_TEACHER
                    currentHomeworks={currentHomeworks}
                    id={id}
                    status="CHECKING"
                    currentLang={currentLang}
                  />
                </div>
              </div>

              {currentHomeworks.findHomeworks ? (
                <div className="homework-viewed-texts">
                  <div className="homework-viewed-text_first">
                    {languageHandler(currentLang, 'Sended')}:{' '}
                    {currentLengthHadnler(
                      currentHomeworks.findHomeworks.length,
                      objects,
                    )}
                  </div>
                  <div className="homework-viewed-text_second">
                    {languageHandler(currentLang, 'Reviewed')}:{' '}
                    {reviewedLengthHadnler(objects)}
                  </div>
                </div>
              ) : (
                <div className="homework-viewed-text">
                  {languageHandler(currentLang, 'Sended')}:
                </div>
              )}

              <div className="homework-block-list">
                <div className="homework-block-sended">
                  <HOMEWORKS_LIST_TEACHER
                    currentHomeworks={currentHomeworks}
                    id={id}
                    status="SENDED"
                    currentLang={currentLang}
                  />
                </div>
                <div className="homework-block-viewed">
                  <HOMEWORKS_LIST_TEACHER
                    currentHomeworks={currentHomeworks}
                    id={id}
                    status="REVIEWED"
                    currentLang={currentLang}
                  />
                </div>
              </div>
              <i
                class="bx bx-chevron-down btn not_show"
                onClick={() => {
                  showHandler('HOMEWORK')
                }}
              ></i>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default HomeworksClassPage
