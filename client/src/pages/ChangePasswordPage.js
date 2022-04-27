import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authApi } from '../redux/apiAuth'
import { getLanguageData } from '../redux/apiLanguage'
import { useMessage } from '../hooks/message.hook'
import { languageHandler } from '../handlers/languageHandler'
import { changeHandler } from '../handlers/changeHandler'
import { changePasswordHandler } from '../handlers/changePasswordHandler'
import Language from '../components/Language'
import '../style/ForgotPage.css'

const ChangePasswordPage = () => {
  const dispatch = useDispatch()
  const message = useMessage()
  const { messages } = useSelector((state) => state.auth)
  const { currentLang } = useSelector((state) => state.language)

  const link = window.location.pathname.split('/')[2]

  const [form, setForm] = useState({
    newPass: '',
    confirmPass: '',
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
    <div className="row-forgot">
      <Language />

      <div className="HeaderStyle-forgot">Copybook</div>

      <div className="form-forgot">
        <input
          className="emailform-forgot"
          placeholder={languageHandler(currentLang, 'ChangePage_input_newPass')}
          onChange={(e) => {
            changeHandler(setForm, form, e)
          }}
          type="password"
          id="newPass"
          name="newPass"
        ></input>
        <input
          className="emailform-forgot"
          placeholder={languageHandler(
            currentLang,
            'ChangePage_input_confPass',
          )}
          onChange={(e) => {
            changeHandler(setForm, form, e)
          }}
          type="password"
          id="confirmPass"
          name="confirmPass"
        ></input>
        <button
          type="submit"
          className="submitform-forgot"
          onClick={(e) => {
            changePasswordHandler(authApi, dispatch, form, link)
          }}
        >
          {languageHandler(currentLang, 'ForgotPage_button_send')}
        </button>
      </div>

      <div className="otherlink-forgot">
        <NavLink to="/register" className="signup-forgot">
          {languageHandler(currentLang, 'ForgotPage_text_account')}{' '}
          <span className="spanothlink-forgot">
            {languageHandler(currentLang, 'ForgotPage_text_signup')}
          </span>
        </NavLink>
      </div>
    </div>
  )
}

export default ChangePasswordPage
