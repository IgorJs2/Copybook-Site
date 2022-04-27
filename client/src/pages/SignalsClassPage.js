import React, { useEffect, useState } from 'react'
import { useMessage } from '../hooks/message.hook'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getUserData } from '../redux/apiUser'
import { getSignalsData } from '../redux/apiSignals'
import { getLanguageData } from '../redux/apiLanguage'
import { languageHandler } from '../handlers/languageHandler'
import { changeHandler } from '../handlers/changeHandler'
import Loader from '../components/Loader'
import SIGNAL_LIST from '../components/Signals_list'
import MainComponent from '../components/MainComponent'
import '../style/SignalsClassPage.css'

const SignalsClassPage = () => {
  const dispatch = useDispatch()
  const message = useMessage()
  const id = window.location.pathname.split('/')[2]
  const { userId } = useSelector((state) => state.auth)
  const { currentLang } = useSelector((state) => state.language)
  const { currentUser } = useSelector((state) => state.user)
  const { messages } = useSelector((state) => state.signals)

  const [form, setForm] = useState({
    title: '',
    text: '',
    id: id,
    name_st: null,
  })

  const submitHandler = async () => {
    await getSignalsData(dispatch, form, 'CREATE_SIGNALS')
  }

  useEffect(() => {
    if (userId) {
      const fetch = async () => {
        await getLanguageData(dispatch, {}, 'GET_LANGUAGE')
        await getUserData(dispatch, userId, 'GET_USER_DATA')
      }
      fetch()
      setForm({ ...form, name_st: currentUser[0].login })
    }
  }, [dispatch, userId])

  useEffect(() => {
    if (messages) {
      message(messages.message, messages.flag, currentLang)
      const fetch = async () => {
        await getSignalsData(dispatch, '', 'CLEAR_MESSAGE')
      }
      fetch()
    }
  }, [messages, message, dispatch])

  return (
    <div>
      {currentUser ? (
        <div>
          <MainComponent currentUser={currentUser} id={id} />
          <div>
            {currentUser[0].role === 'Student' ? (
              <div className="signals-block">
                <div className="signals-block-title">
                  {languageHandler(currentLang, 'Title')}:
                </div>
                <input
                  type="text"
                  className="signals-block-titl"
                  name="title"
                  onChange={(e) => {
                    changeHandler(setForm, form, e)
                  }}
                ></input>
                <div className="signals-block-message">
                  {languageHandler(currentLang, 'Message')}:
                </div>
                <textarea
                  type="text"
                  className="signals-block-text"
                  name="text"
                  onChange={(e) => {
                    changeHandler(setForm, form, e)
                  }}
                ></textarea>
                <button
                  type="submit"
                  className="signals-block-button"
                  onClick={submitHandler}
                >
                  {languageHandler(currentLang, 'Submit')}
                </button>
              </div>
            ) : (
              <SIGNAL_LIST id={id} currentLang={currentLang} />
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default SignalsClassPage
