import React, { useEffect, useState } from 'react'
import { authApi } from '../redux/apiAuth'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getStudentData } from '../redux/apiStudents'
import { getLanguageData } from '../redux/apiLanguage'
import { languageHandler } from '../handlers/languageHandler'
import { logoutHandler } from '../handlers/logoutHandler'
import { mobileMenuHandler } from '../handlers/mobileMenuHandler'
import Language from './Language'

const MainComponent = ({ currentUser, id }) => {
  const dispatch = useDispatch()
  const { currentStudent } = useSelector((state) => state.student)
  const { currentLang } = useSelector((state) => state.language)

  const [classData, setClassData] = useState({
    name: '',
    code: '',
  })

  useEffect(() => {
    const fetch = async () => {
      await getLanguageData(dispatch, {}, 'GET_LANGUAGE')
      await getStudentData(
        dispatch,
        { class_: id, id: currentUser[0]._id, user: currentUser[0].role },
        'GET_STUDENT_DATA',
      )
    }
    fetch()
    for (let i = 0; i < currentUser[1].length; i++) {
      if (currentUser[1][i]._id.toString() === id) {
        setClassData({
          ...classData,
          code: currentUser[1][i].code,
          name: currentUser[1][i].name,
        })
      }
    }
  }, [])

  if (currentUser[0].role === 'Teacher') {
    return (
      <>
        <Language />
        <div className="mobile-btn">
          <i class="bx bx-list-ul" onClick={mobileMenuHandler}></i>
        </div>
        <div className="sidebar">
          <div className="logo-details">
            <i className="bx bx-right-arrow-alt hovers"></i>
            <div className="logo_name">Copybook</div>
          </div>
          <ul className="nav-list">
            <li>
              <NavLink to={'/class/' + id} className="a">
                <i className="bx bx-home"></i>
                <span className="links_name">
                  {languageHandler(currentLang, 'MainComponent_home')}
                </span>
              </NavLink>
              <span className="tooltip">
                {languageHandler(currentLang, 'MainComponent_home')}
              </span>
            </li>
            <li>
              <NavLink to={'/class/' + id + '/progress'} className="a">
                <i className="bx bx-bar-chart-alt-2"></i>
                <span className="links_name">
                  {languageHandler(currentLang, 'MainComponent_progress')}
                </span>
              </NavLink>
              <span className="tooltip">
                {languageHandler(currentLang, 'MainComponent_progress')}
              </span>
            </li>
            <li>
              <NavLink to={'/class/' + id + '/grades'} className="a">
                <i class="bx bxs-graduation"></i>
                <span className="links_name">
                  {languageHandler(currentLang, 'MainComponent_grade')}
                </span>
              </NavLink>
              <span className="tooltip">
                {languageHandler(currentLang, 'MainComponent_grade')}
              </span>
            </li>
            <li>
              <NavLink to={'/class/' + id + '/homeworks'} className="a">
                <i className="bx bx-book-open"></i>
                <span className="links_name">
                  {languageHandler(currentLang, 'MainComponent_homework')}
                </span>
              </NavLink>
              <span className="tooltip">
                {languageHandler(currentLang, 'MainComponent_homework')}
              </span>
            </li>
            <li>
              <NavLink to={'/class/' + id + '/news'} className="a">
                <i className="bx bx-news"></i>
                <span className="links_name">
                  {languageHandler(currentLang, 'MainComponent_news')}
                </span>
              </NavLink>
              <span className="tooltip">
                {languageHandler(currentLang, 'MainComponent_news')}
              </span>
            </li>
            <li>
              <NavLink to={'/class/' + id + '/signals'} className="a">
                <i className="bx bx-message-dots"></i>
                <span className="links_name">
                  {languageHandler(currentLang, 'MainComponent_messages')}
                </span>
              </NavLink>
              <span className="tooltip">
                {languageHandler(currentLang, 'MainComponent_messages')}
              </span>
            </li>
            <li>
              <NavLink to={'/class/' + id + '/materials'} className="a">
                <i className="bx bx-box"></i>
                <span className="links_name">
                  {languageHandler(currentLang, 'MainComponent_materials')}
                </span>
              </NavLink>
              <span className="tooltip">
                {languageHandler(currentLang, 'MainComponent_materials')}
              </span>
            </li>

            <li className="last-tc-teacher">
              <NavLink
                to="#"
                className="a"
                onClick={(e) => {
                  logoutHandler(authApi, dispatch)
                }}
              >
                <i className="bx bx-log-out" id="log_out"></i>
                <span className="links_name">
                  {languageHandler(currentLang, 'MainComponent_logout')}
                </span>
              </NavLink>
              <span className="tooltip">
                {languageHandler(currentLang, 'MainComponent_logout')}
              </span>
            </li>
          </ul>
        </div>

        <div className="top-bar">
          <div className="top-bar-name">{currentUser[0].login}</div>
          <div className="top-bar-class">
            {languageHandler(currentLang, 'MainComponent_class') +
              ':' +
              ' ' +
              classData.name}
          </div>
          <div className="top-bar-code">
            {languageHandler(currentLang, 'MainComponent_code') +
              ':' +
              ' ' +
              classData.code}
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Language />
        <div className="mobile-btn">
          <i class="bx bx-list-ul" onClick={mobileMenuHandler}></i>
        </div>
        <div className="sidebar">
          <div className="logo-details">
            <i className="bx bx-right-arrow-alt hovers"></i>
            <div className="logo_name">Copybook</div>
          </div>
          <ul className="nav-list">
            <li>
              <NavLink to={'/class/' + id} className="a">
                <i className="bx bx-home"></i>
                <span className="links_name">
                  {languageHandler(currentLang, 'MainComponent_home')}
                </span>
              </NavLink>
              <span className="tooltip">
                {languageHandler(currentLang, 'MainComponent_home')}
              </span>
            </li>
            <li>
              <NavLink to={'/class/' + id + '/progress'} className="a">
                <i className="bx bx-bar-chart-alt-2"></i>
                <span className="links_name">
                  {languageHandler(currentLang, 'MainComponent_progress')}
                </span>
              </NavLink>
              <span className="tooltip">
                {languageHandler(currentLang, 'MainComponent_progress')}
              </span>
            </li>
            <li>
              <NavLink to={'/class/' + id + '/homeworks'} className="a">
                <i className="bx bx-book-open"></i>
                <span className="links_name">
                  {languageHandler(currentLang, 'MainComponent_homework')}
                </span>
              </NavLink>
              <span className="tooltip">
                {languageHandler(currentLang, 'MainComponent_homework')}
              </span>
            </li>
            <li>
              <NavLink to={'/class/' + id + '/news'} className="a">
                <i className="bx bx-news"></i>
                <span className="links_name">
                  {languageHandler(currentLang, 'MainComponent_news')}
                </span>
              </NavLink>
              <span className="tooltip">
                {languageHandler(currentLang, 'MainComponent_news')}
              </span>
            </li>
            <li>
              <NavLink to={'/class/' + id + '/signals'} className="a">
                <i className="bx bx-message-dots"></i>
                <span className="links_name">
                  {languageHandler(currentLang, 'MainComponent_notify-teacher')}
                </span>
              </NavLink>
              <span className="tooltip">
                {languageHandler(currentLang, 'MainComponent_notify-teacher')}
              </span>
            </li>
            <li>
              <NavLink to={'/class/' + id + '/answers'} className="a">
                <i className="bx bx-message-alt-edit"></i>
                <span className="links_name">
                  {languageHandler(currentLang, 'MainComponent_tc-answers')}
                </span>
              </NavLink>
              <span className="tooltip">
                {languageHandler(currentLang, 'MainComponent_tc-answers')}
              </span>
            </li>
            <li>
              <NavLink to={'/class/' + id + '/materials'} className="a">
                <i className="bx bx-box"></i>
                <span className="links_name">
                  {languageHandler(currentLang, 'MainComponent_materials')}
                </span>
              </NavLink>
              <span className="tooltip">
                {languageHandler(currentLang, 'MainComponent_materials')}
              </span>
            </li>

            <li className="last">
              <NavLink
                to="#"
                className="a"
                onClick={(e) => {
                  logoutHandler(authApi, dispatch)
                }}
              >
                <i className="bx bx-log-out" id="log_out"></i>
                <span className="links_name">
                  {languageHandler(currentLang, 'MainComponent_logout')}
                </span>
              </NavLink>
              <span className="tooltip">
                {languageHandler(currentLang, 'MainComponent_logout')}
              </span>
            </li>
          </ul>
        </div>

        <div className="top-bar">
          <div className="top-bar-name">{currentUser[0].login}</div>
          <div className="top-bar-class">
            <>{languageHandler(currentLang, 'MainComponent_class')}</>
            <>: </>
            <>{classData.name}</>
          </div>
          <div className="top-bar-rate">
            <div className="top-bar-rate-info">
              {currentStudent.user}
              <i className="bx bx-award"></i>
            </div>
          </div>
        </div>

        <div className="main-bar"></div>
      </>
    )
  }
}

export default MainComponent
