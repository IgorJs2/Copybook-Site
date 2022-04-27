import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMessage } from '../hooks/message.hook'
import { authApi } from '../redux/apiAuth'
import { getLanguageData } from '../redux/apiLanguage'
import { changeHandler } from '../handlers/changeHandler'
import { loginHandler } from '../handlers/loginHandler'
import { languageHandler } from '../handlers/languageHandler'
import Language from '../components/Language'
import '../style/LoginPage.css'

const LoginPage = () => {
  const dispatch = useDispatch()
  const message = useMessage()
  const { currentLang } = useSelector((state) => state.language)
  const { messages } = useSelector((state) => state.auth)

  const [form, setForm] = useState({
    login: '',
    password: '',
  })

  useEffect(() => {
    const fetch = async () => {
      await getLanguageData(dispatch, {}, 'GET_LANGUAGE')
    }
    fetch()
  }, [])

  useEffect(() => {
    if (messages) {
      message(messages.message, messages.flag, currentLang)
    }
  }, [messages, message, dispatch])

  return (
    <div className="row-login">
      <Language />

      <div className="HeaderStyle-login">Copybook</div>
      <div className="forms-login">
        <input
          className="loginform-login"
          placeholder={languageHandler(currentLang, 'LoginPage_input_name')}
          onChange={(e) => {
            changeHandler(setForm, form, e)
          }}
          type="text"
          id="login"
          name="login"
        ></input>
        <input
          className="passwordform-login"
          placeholder={languageHandler(currentLang, 'LoginPage_input_password')}
          onChange={(e) => {
            changeHandler(setForm, form, e)
          }}
          type="password"
          id="password"
          name="password"
        ></input>
        <button
          type="submit"
          className="submitform-login"
          onClick={() => {
            loginHandler(authApi, dispatch, form)
          }}
        >
          {languageHandler(currentLang, 'LoginPage_button_enter')}
        </button>
      </div>

      <div className="otherlinks-login">
        <NavLink to="/forgot" className="forgot-login">
          {languageHandler(currentLang, 'LoginPage_text_forgot')}
        </NavLink>
        <NavLink to="/register" className="signup-login">
          {languageHandler(currentLang, 'LoginPage_text_account')}{' '}
          <span className="spanothlink-login">
            {languageHandler(currentLang, 'LoginPage_text_signup')}
          </span>
        </NavLink>
      </div>
    </div>
  )
}

export default LoginPage
