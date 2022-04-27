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
import { createHandler } from '../handlers/createHandler'
import { changeHandler } from '../handlers/changeHandler'
import Loader from '../components/Loader'
import Language from '../components/Language'
import '../style/CreateClassPage.css'

const CreateClassPage = () => {
  const history = useHistory()
  const message = useMessage()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
  const { currentLang } = useSelector((state) => state.language)
  const { messages } = useSelector((state) => state.class)
  const { userId } = useSelector((state) => state.auth)

  const [form, setForm] = useState({
    className: '',
    code: '',
    teacher: userId,
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
        <div className="row-create-class">
          <Language />

          <div className="student-role-create">
            {currentUser[0].role === 'Teacher' ? (
              <>{languageHandler(currentLang, 'ClassPage_role_teacher')}</>
            ) : (
              <>{languageHandler(currentLang, 'ClassPage_role_student')}</>
            )}
          </div>

          <div className="student-name-create">{currentUser[0].login}</div>

          <div className="main-form-create">
            <h1 className="class-create">
              {languageHandler(currentLang, 'ClassPages_create')}
            </h1>

            <input
              className="class-name-create"
              type="text"
              placeholder={languageHandler(currentLang, 'ClassPages_name')}
              onChange={(e) => {
                changeHandler(setForm, form, e)
              }}
              name="className"
            ></input>
            <input
              className="class-code-create"
              type="text"
              placeholder={languageHandler(currentLang, 'ClassPages_code')}
              onChange={(e) => {
                changeHandler(setForm, form, e)
              }}
              name="code"
            ></input>
            <button
              className="submit-bt-create"
              onClick={() => {
                createHandler(ClassAction, dispatch, form)
              }}
            >
              {languageHandler(currentLang, 'ClassPages_submit')}
            </button>
          </div>

          <button
            className="button-lg-classes-create"
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

export default CreateClassPage
