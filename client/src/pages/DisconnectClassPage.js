import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useMessage } from '../hooks/message.hook'
import { getLanguageData } from '../redux/apiLanguage'
import { languageHandler } from '../handlers/languageHandler'
import { redirectHandler } from '../handlers/redirectHandler'
import { disconnectHandler } from '../handlers/disconnectHandler'
import { changeHandler } from '../handlers/changeHandler'
import { getUserData } from '../redux/apiUser'
import { ClassAction } from '../redux/apiClass'
import '../style/DisconnectClassPage.css'
import Loader from '../components/Loader'
import Language from '../components/Language'

const ConnectClassPage = () => {
  const history = useHistory()
  const message = useMessage()
  const dispatch = useDispatch()
  const { userId } = useSelector((state) => state.auth)
  const { currentUser } = useSelector((state) => state.user)
  const { currentLang } = useSelector((state) => state.language)
  const { messages } = useSelector((state) => state.class)

  const [form, setForm] = useState({
    name: '',
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
  }, [messages, message, dispatch])

  return (
    <>
      {currentUser ? (
        <div className="row-disconnect-class">
          <Language />

          <div className="student-role-disconnect">
            {currentUser[0].role === 'Teacher' ? (
              <>{languageHandler(currentLang, 'ClassPage_role_teacher')}</>
            ) : (
              <>{languageHandler(currentLang, 'ClassPage_role_student')}</>
            )}
          </div>

          <div className="student-name-disconnect">{currentUser[0].login}</div>

          <div className="main-form-disconnect">
            <h1 className="class-disconnect">
              {languageHandler(currentLang, 'ClassPages_disconnect')}
            </h1>

            <input
              className="class-code-disconnect"
              type="text"
              placeholder={languageHandler(currentLang, 'ClassPages_name')}
              onChange={(e) => {
                changeHandler(setForm, form, e)
              }}
              name="name"
            ></input>
            <button
              className="submit-bt-disconnect"
              onClick={() => {
                disconnectHandler(ClassAction, dispatch, form)
              }}
            >
              {languageHandler(currentLang, 'ClassPages_submit')}
            </button>
          </div>

          <button
            className="button-lg-classes-disconnect"
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
