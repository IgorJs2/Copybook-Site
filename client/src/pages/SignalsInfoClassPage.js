import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserData } from '../redux/apiUser'
import { getSignalsData } from '../redux/apiSignals'
import { getLanguageData } from '../redux/apiLanguage'
import { languageHandler } from '../handlers/languageHandler'
import { redirectHandler } from '../handlers/redirectHandler'
import '../style/SignalsInfoClassPage.css'
import MainComponent from '../components/MainComponent'
import Page404 from './Page404'
import Loader from '../components/Loader'

const SignalsInfoClassPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const id = window.location.pathname.split('/')[2]
  const title = decodeURI(window.location.pathname.split('/')[4])
  const { userId } = useSelector((state) => state.auth)
  const { currentUser } = useSelector((state) => state.user)
  const { currentLang } = useSelector((state) => state.language)
  const { currentSignals } = useSelector((state) => state.signals)

  useEffect(() => {
    if (title && userId) {
      const fetch = async () => {
        await getLanguageData(dispatch, {}, 'GET_LANGUAGE')
        await getUserData(dispatch, userId, 'GET_USER_DATA')
        await getSignalsData(dispatch, title, 'GET_SIGNALS')
      }
      fetch()
    }
  }, [dispatch, title, userId])

  return (
    <div>
      {currentUser &&
      currentSignals &&
      currentSignals.findSignalsByTitle &&
      currentUser[0].role ? (
        <div>
          {currentUser[0].role === 'Teacher' ? (
            <>
              <MainComponent currentUser={currentUser} id={id} />
              <div className="signals-info">
                <div className="signals-text-block">
                  <div className="signals-info-title">
                    {currentSignals.findSignalsByTitle.title}
                    <pre>
                      {'                '}
                      {currentSignals.findSignalsByTitle.name_st}
                    </pre>
                  </div>
                  <div className="signals-info-date">
                    {currentSignals.findSignalsByTitle.date}
                  </div>
                </div>
                <div className="signals-info-block">
                  {currentSignals.findSignalsByTitle.text}
                </div>
                <div className="signals-buttons">
                  <div className="button-signals-toanswer">
                    <NavLink
                      className="button-lg-signals-toanswer"
                      to={
                        '/class/' +
                        id +
                        '/answer/' +
                        currentSignals.findSignalsByTitle.title
                      }
                    >
                      To answer
                    </NavLink>
                  </div>
                  <div className="button-signals-redirect">
                    <button
                      className="button-lg-signals-redirect"
                      onClick={(e) => {
                        redirectHandler(history, id, 'signals')
                      }}
                    >
                      {languageHandler(currentLang, 'Back')}
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Page404 />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default SignalsInfoClassPage
