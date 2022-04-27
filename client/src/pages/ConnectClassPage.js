import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useMessage } from '../hooks/message.hook'
import { getUserData } from '../redux/apiUser'
import { ClassAction } from '../redux/apiClass'
import { getLanguageData } from '../redux/apiLanguage'
import { languageHandler } from '../handlers/languageHandler'
import { redirectHandler } from '../handlers/redirectHandler'
import { connectHandler } from '../handlers/connectHandler'
import { changeHandler } from '../handlers/changeHandler'
import Loader from '../components/Loader'
import Language from '../components/Language'
import '../style/ConnectClassPage.css'

const ConnectClassPage = () => {
  const history = useHistory()
  const message = useMessage()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
  const { currentLang } = useSelector((state) => state.language)
  const { messages } = useSelector((state) => state.class)
  const { userId } = useSelector((state) => state.auth)

  const [form, setForm] = useState({
    code: '',
    student: userId,
  })

  useEffect(() => {
    if (userId) {
      const fetch = async () => {
        await getUserData(dispatch, userId, 'GET_USER_DATA')
        await getLanguageData(dispatch, {}, 'GET_LANGUAGE')
      }
      fetch()
    }
  }, [dispatch, userId])

  useEffect(() => {
    if (messages) {
      message(messages.message, messages.flag, currentLang)
      const fetch = async () => {
        await ClassAction(dispatch, '', 'CLEAR_MESSAGE')
      }
      fetch()
    }
  }, [messages, dispatch, message])

  return (
    <>
      {currentUser ? (
        <div className="row-connect-class">
          <Language />

          <div className="student-role-connect">
            {currentUser[0].role === 'Teacher' ? (
              <>{languageHandler(currentLang, 'ClassPage_role_teacher')}</>
            ) : (
              <>{languageHandler(currentLang, 'ClassPage_role_student')}</>
            )}
          </div>

          <div className="student-name-connect">{currentUser[0].login}</div>

          <div className="main-form-connect">
            <h1 className="class-connect">
              {languageHandler(currentLang, 'ClassPages_connect')}
            </h1>

            <input
              className="class-code-connect"
              type="text"
              placeholder={languageHandler(currentLang, 'ClassPages_code')}
              onChange={(e) => {
                changeHandler(setForm, form, e)
              }}
              name="code"
            ></input>
            <button
              className="submit-bt-connect"
              onClick={() => {
                connectHandler(ClassAction, dispatch, form)
              }}
            >
              {languageHandler(currentLang, 'ClassPages_submit')}
            </button>
          </div>

          <button
            className="button-lg-classes-connect"
            onClick={() => {
              redirectHandler(history, null, 'classes')
            }}
          >
            {languageHandler(currentLang, 'ClassPages_back')}
          </button>
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default ConnectClassPage
