import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getUserData } from '../redux/apiUser'
import { getAnswersData } from '../redux/apiAnswers'
import { getLanguageData } from '../redux/apiLanguage'
import { languageHandler } from '../handlers/languageHandler'
import { redirectHandler } from '../handlers/redirectHandler'
import Page404 from './Page404'
import MainComponent from '../components/MainComponent'
import Loader from '../components/Loader'
import '../style/AnswersInfoClassPage.css'

const AnswersInfoClassPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { userId } = useSelector((state) => state.auth)
  const { currentUser } = useSelector((state) => state.user)
  const { currentAnswers } = useSelector((state) => state.answers)
  const { currentLang } = useSelector((state) => state.language)

  const id = window.location.pathname.split('/')[2]
  const title = decodeURI(window.location.pathname.split('/')[4])

  useEffect(() => {
    if (userId && title) {
      const fetch = async () => {
        await getLanguageData(dispatch, {}, 'GET_LANGUAGE')
        await getUserData(dispatch, userId, 'GET_USER_DATA')
        await getAnswersData(
          dispatch,
          { user: userId, class_: id, title },
          'GET_ANSWER',
        )
      }
      fetch()
    }
  }, [])

  return (
    <div>
      {currentUser && currentAnswers && currentAnswers.answer ? (
        <div>
          {currentUser[0].role === 'Student' ? (
            <>
              <MainComponent currentUser={currentUser} id={id} />
              <div className="answers-info">
                <div className="answers-text-block">
                  <div className="answers-info-title">
                    {currentAnswers.answer.signal}
                    <pre> {'                '}</pre>
                  </div>
                  <div className="answers-info-date">
                    {currentAnswers.answer.date}
                  </div>
                </div>
                <div className="answers-info-block">
                  {currentAnswers.answer.answer}
                </div>
                <div className="answers-buttons">
                  <div className="button-answers-toanswer"></div>
                  <div className="button-answers-redirect">
                    <button
                      className="button-lg-answers-redirect"
                      onClick={() => {
                        redirectHandler(history, id, 'answers')
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

export default AnswersInfoClassPage
