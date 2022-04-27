import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMessage } from '../hooks/message.hook'
import { authApi } from '../redux/apiAuth'
import { getLanguageData } from '../redux/apiLanguage'
import { languageHandler } from '../handlers/languageHandler'
import { changeHandler } from '../handlers/changeHandler'
import { registerHandler } from '../handlers/registerHandler'
import Select from 'react-select'
import Language from '../components/Language'
import { customStylesForSelect } from '../style/SelectStyle'
import '../style/RegisterPage.css'

const RegisterPage = () => {
  const message = useMessage()
  const dispatch = useDispatch()
  const { currentLang } = useSelector((state) => state.language)
  const { messages } = useSelector((state) => state.auth)

  const options = [
    {
      value: 'Student',
      label: languageHandler(currentLang, 'RegisterPage_student'),
      name: 'role',
    },
    {
      value: 'Teacher',
      label: languageHandler(currentLang, 'RegisterPage_teacher'),
      name: 'role',
    },
  ]

  const [form, setForm] = useState({
    login: '',
    email: '',
    password: '',
    role: '',
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
      const fetch = async () => {
        await authApi(dispatch, '', 'CLEAR_MESSAGE')
      }
      fetch()
    }
  }, [messages, message, dispatch])

  return (
    <div className="row-register">
      <Language />
      <div className="HeaderStyle-register">Copybook</div>

      <div className="form-register">
        <input
          className="loginform-register"
          placeholder={languageHandler(currentLang, 'RegisterPage_input_name')}
          onChange={(e) => {
            changeHandler(setForm, form, e)
          }}
          type="text"
          id="login"
          name="login"
        ></input>
        <input
          className="emailform-register"
          placeholder={languageHandler(currentLang, 'RegisterPage_input_mail')}
          onChange={(e) => {
            changeHandler(setForm, form, e)
          }}
          type="text"
          id="email"
          name="email"
        ></input>
        <input
          className="passwordform-register"
          placeholder={languageHandler(
            currentLang,
            'RegisterPage_input_password',
          )}
          onChange={(e) => {
            changeHandler(setForm, form, e)
          }}
          type="password"
          id="password"
          name="password"
        ></input>
      </div>

      <div className="form-select-register">
        <Select
          options={options}
          className="chooseform-register"
          styles={customStylesForSelect}
          placeholder={languageHandler(currentLang, 'RegisterPage_input_role')}
          onChange={(e) => {
            changeHandler(setForm, form, e)
          }}
        />

        <div className="">
          <button
            type="submit"
            className="submitform-register"
            onClick={(e) => {
              registerHandler(authApi, dispatch, form)
            }}
          >
            {languageHandler(currentLang, 'RegisterPage_button_signup')}
          </button>
        </div>
      </div>

      <div className="otherlink-register">
        <NavLink to="/login" className="signup-register">
          {languageHandler(currentLang, 'RegisterPage_text_account')}
          <span className="spanothlink-register">
            {languageHandler(currentLang, 'RegisterPage_text_signin')}
          </span>
        </NavLink>
      </div>
    </div>
  )
}

export default RegisterPage
