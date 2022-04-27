import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useMessage } from '../hooks/message.hook'
import { getUserData } from '../redux/apiUser'
import { getNewsData } from '../redux/apiNews'
import { getFileData } from '../redux/apiFile'
import { getLanguageData } from '../redux/apiLanguage'
import { languageHandler } from '../handlers/languageHandler'
import { changeHandler } from '../handlers/changeHandler'
import { chooseHandler } from '../handlers/chooseHandler'
import Loader from '../components/Loader'
import NEWS_LISTS from '../components/News_lists'
import FILE_LIST from '../components/File_list'
import MainComponent from '../components/MainComponent'
import '../style/NewsClassPage.css'

const NewsClassPage = () => {
  const dispatch = useDispatch()
  const message = useMessage()
  const { userId } = useSelector((state) => state.auth)
  const { currentUser } = useSelector((state) => state.user)
  const { messages } = useSelector((state) => state.news)
  const { currentLang } = useSelector((state) => state.language)
  const { messageFile, error } = useSelector((state) => state.file)
  const id = window.location.pathname.split('/')[2]

  const [file, setFile] = useState({
    file: null,
  })
  const [form, setForm] = useState({
    title: '',
    text: '',
  })

  const submitHandler = async () => {
    try {
      if (messageFile) {
        await getNewsData(dispatch, { ...form, messageFile, id }, 'CREATE_NEWS')
      } else {
        await getNewsData(dispatch, { ...form, id }, 'CREATE_NEWS')
      }
      setFile({ ...file, file: null })
      await getFileData(dispatch, {}, 'CLEAR_DATA')
      await getFileData(dispatch, {}, 'CLEAR_OTHER_FILE')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userId) {
      const fetch = async () => {
        await getLanguageData(dispatch, {}, 'GET_LANGUAGE')
        await getUserData(dispatch, userId, 'GET_USER_DATA')
      }
      fetch()
    }
  }, [userId, dispatch])

  useEffect(() => {
    if (messages) {
      message(messages.message, messages.flag, currentLang)
      const fetch = async () => {
        await getNewsData(dispatch, '', 'CLEAR_MESSAGE')
      }
      fetch()
    }
    if (error) {
      message(error.message, error.flag, currentLang)
      const file = document.querySelector('#file')
      const emptyFile = document.createElement('input')
      emptyFile.type = 'file'

      file.files = emptyFile.files
    }
  }, [messages, message, dispatch, error])

  useEffect(() => {
    try {
      if (file.file) {
        const fetch = async () => {
          await getFileData(dispatch, file, 'CREATE_FILE')
        }
        fetch()
        setFile({ ...file, file: null })
      }
    } catch (error) {
      setFile({ ...file, file: null })
    }
  }, [file, dispatch])

  useEffect(() => {
    console.log(form)
  }, [form])

  return (
    <>
      {currentUser ? (
        <>
          <MainComponent currentUser={currentUser} id={id} />
          <>
            {currentUser[0].role === 'Teacher' ? (
              <div className="news-block">
                <div className="news-block-title">
                  {languageHandler(currentLang, 'Title')}:
                </div>
                <input
                  type="text"
                  className="news-block-titl"
                  name="title"
                  onChange={(e) => {
                    changeHandler(setForm, form, e)
                  }}
                ></input>
                <div className="news-block-message">
                  {languageHandler(currentLang, 'Message')}:
                </div>
                <textarea
                  type="text"
                  className="news-block-text"
                  name="text"
                  onChange={(e) => {
                    changeHandler(setForm, form, e)
                  }}
                ></textarea>
                {messageFile ? (
                  <FILE_LIST filename={messageFile} currentLang={currentLang} />
                ) : (
                  <div className="news-block-file">
                    <input
                      type="file"
                      name="file"
                      id="file"
                      className="file-input"
                      onChange={(e) => {
                        chooseHandler(setFile, file, e)
                      }}
                    />
                  </div>
                )}
                <button className="news-block-button" onClick={submitHandler}>
                  {languageHandler(currentLang, 'Submit')}
                </button>
              </div>
            ) : (
              <NEWS_LISTS id={id} currentLang={currentLang} />
            )}
          </>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default NewsClassPage
