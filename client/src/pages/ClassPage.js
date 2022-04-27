import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { authApi } from '../redux/apiAuth'
import { getUserData } from '../redux/apiUser'
import { getLanguageData } from '../redux/apiLanguage'
import { languageHandler } from '../handlers/languageHandler'
import { logoutHandler } from '../handlers/logoutHandler'
import Language from '../components/Language'
import Loader from '../components/Loader'
import CLASSES_LIST from '../components/Classes_list'
import '../style/ClassPage.css'

const ClassPage = () => {
  const dispatch = useDispatch()
  const { userId } = useSelector((state) => state.auth)
  const { currentLang } = useSelector((state) => state.language)
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    if (userId) {
      const fetch = async () => {
        await getUserData(dispatch, userId, 'GET_USER_DATA')
        await getLanguageData(dispatch, {}, 'GET_LANGUAGE')
      }
      fetch()
    }
  }, [dispatch, userId])

  return (
    <div className="row-classes">
      {currentUser && currentUser[0] ? (
        <>
          <Language />
          <div className="student-name">{currentUser[0].login}</div>
          <div className="student-role">
            {currentUser[0].role === 'Teacher' ? (
              <>{languageHandler(currentLang, 'ClassPage_role_teacher')}</>
            ) : (
              <>{languageHandler(currentLang, 'ClassPage_role_student')}</>
            )}
          </div>

          <div className="main-menu">
            <div className="text">
              <div className="classes">
                {languageHandler(currentLang, 'ClassPage_classes')}:
              </div>
              <div className="nb-of-class">
                {currentUser[0].nb_of_classes}/3
              </div>
            </div>
            <div className="forclass">
              {currentUser[0].nb_of_classes !== 0 ? (
                <CLASSES_LIST currentUser={currentUser} lang={currentLang} />
              ) : (
                <></>
              )}
            </div>
            <div className="links">
              {currentUser[0].role === 'Student' ? (
                <NavLink to="/connect-class" className="butt-connect">
                  {languageHandler(currentLang, 'ClassPage_connect')}
                </NavLink>
              ) : (
                <NavLink to="/create-class" className="butt-connect">
                  {languageHandler(currentLang, 'ClassPage_create')}
                </NavLink>
              )}
              {currentUser[0].role === 'Student' ? (
                <NavLink to="/disconnect-class" className="butt-delete">
                  {languageHandler(currentLang, 'ClassPage_disconnect')}
                </NavLink>
              ) : (
                <NavLink to="/del-class" className="butt-delete">
                  {languageHandler(currentLang, 'ClassPage_delete')}
                </NavLink>
              )}
            </div>
          </div>

          <div className="div-lg-classes">
            <button
              className="button-lg-classes"
              onClick={() => {
                logoutHandler(authApi, dispatch)
              }}
            >
              {languageHandler(currentLang, 'ClassPage_logout')}
            </button>
          </div>
        </>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default ClassPage
