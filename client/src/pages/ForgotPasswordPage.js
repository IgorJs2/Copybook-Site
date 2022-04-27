import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authApi } from '../redux/apiAuth'
import { getLanguageData } from '../redux/apiLanguage'
import { useMessage } from '../hooks/message.hook'
import { languageHandler } from '../handlers/languageHandler'
import { changeHandler } from '../handlers/changeHandler'
import Language from '../components/Language'
import '../style/ForgotPage.css'

const ForgotPasswordPage = () => {
  const dispatch = useDispatch()
  const message = useMessage()
  const { messages } = useSelector((state) => state.auth)
  const { currentLang } = useSelector((state) => state.language)

  const [form, setForm] = useState({
    email: '',
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

  const requestHandler = async () => {
    try {
      await authApi(dispatch, { ...form }, 'FORGOT')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="row-forgot">
      <Language />

      <div className="HeaderStyle-forgot">Copybook</div>

      <div className="form-forgot">
        <input
          className="emailform-forgot"
          placeholder={languageHandler(currentLang, 'ForgotPage_input_mail')}
          onChange={(e) => {
            changeHandler(setForm, form, e)
          }}
          type="text"
          id="email"
          name="email"
        ></input>
        <button
          type="submit"
          className="submitform-forgot"
          onClick={requestHandler}
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

export default ForgotPasswordPage
