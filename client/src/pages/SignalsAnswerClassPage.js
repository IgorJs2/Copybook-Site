import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useMessage } from '../hooks/message.hook'
import { getAnswersData } from '../redux/apiAnswers'
import { getSignalsData } from '../redux/apiSignals'
import { getUserData } from '../redux/apiUser'
import { languageHandler } from '../handlers/languageHandler'
import { changeHandler } from '../handlers/changeHandler'
import MainComponent from '../components/MainComponent'
import Loader from '../components/Loader'
import '../style/SignalsAnswerClassPage.css'

const SignalsAnswerClassPage = () => {
  const dispatch = useDispatch()
  const message = useMessage()
  const { userId } = useSelector((state) => state.auth)
  const { currentUser } = useSelector((state) => state.user)
  const { messages } = useSelector((state) => state.answers)
  const { currentSignals } = useSelector((state) => state.signals)
  const { currentLang } = useSelector((state) => state.language)
  const title = decodeURI(window.location.pathname.split('/')[4])
  const id = window.location.pathname.split('/')[2]

  const [form, setForm] = useState({
    answer: '',
    class_: id,
    teacher: null,
    student: null,
    signal: title,
  })

  const submitHandler = async () => {
    try {
      await getAnswersData(dispatch, form, 'CREATE_ANSWER')
      await getSignalsData(dispatch, { signal: title }, 'DELETE_SIGNALS')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (userId && title) {
      const fetch = async () => {
        await getUserData(dispatch, userId, 'GET_USER_DATA')
        await getSignalsData(dispatch, title, 'GET_SIGNALS')
      }
      fetch()
    }
  }, [dispatch, userId, id, title])

  useEffect(() => {
    if (currentUser && currentUser[0]) {
      setForm((f) => {
        return { ...f, teacher: currentUser[0]._id }
      })
    }
  }, [currentUser])

  useEffect(() => {
    if (currentSignals && currentSignals.findSignalsByTitle) {
      setForm((f) => {
        return { ...f, student: currentSignals.findSignalsByTitle.name_st }
      })
    }
  }, [currentSignals])

  useEffect(() => {
    if (messages) {
      message(messages.message, messages.flag, currentLang)
      const fetch = async () => {
        await getAnswersData(dispatch, '', 'CLEAR_MESSAGE')
      }
      fetch()
    }
  }, [messages, message, dispatch])

  return (
    <>
      {currentUser ? (
        <>
          <>
            <MainComponent currentUser={currentUser} id={id} />
            <div className="signals-answers-block">
              <div className="signals-answers-block-message">
                {languageHandler(currentLang, 'Answer')}:
              </div>
              <textarea
                type="text"
                className="signals-answers-block-text"
                name="answer"
                onChange={(e) => {
                  changeHandler(setForm, form, e)
                }}
              ></textarea>
              <button
                type="submit"
                className="signals-answers-block-button"
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
          </>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default SignalsAnswerClassPage
