import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useMessage } from '../hooks/message.hook'
import { getUserData } from '../redux/apiUser'
import { getMaterialsData } from '../redux/apiMaterial'
import { getFileData } from '../redux/apiFile'
import { getLanguageData } from '../redux/apiLanguage'
import { languageHandler } from '../handlers/languageHandler'
import { changeHandler } from '../handlers/changeHandler'
import { chooseHandler } from '../handlers/chooseHandler'
import Loader from '../components/Loader'
import FILE_LIST from '../components/File_list'
import MainComponent from '../components/MainComponent'
import '../style/MaterialsFormClassPage.css'

const MaterialsFormClassPage = () => {
  const dispatch = useDispatch()
  const message = useMessage()
  const { userId } = useSelector((state) => state.auth)
  const { currentUser } = useSelector((state) => state.user)
  const { currentLang } = useSelector((state) => state.language)
  const { messages } = useSelector((state) => state.materials)
  const { messageFile, error } = useSelector((state) => state.file)
  const id = window.location.pathname.split('/')[2]

  const [file, setFile] = useState({
    file: null,
  })

  const [form, setForm] = useState({
    name: null,
  })

  const submitHandler = async () => {
    try {
      await getMaterialsData(
        dispatch,
        { ...form, filename: messageFile, id: id },
        'CREATE_MATERIALS',
      )
      setFile({ ...file, file: null })
      await getFileData(dispatch, {}, 'CLEAR_DATA')
      await getFileData(dispatch, { type: 'Material' }, 'CLEAR_OTHER_FILE')
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
  }, [dispatch, userId])

  useEffect(() => {
    if (messages) {
      message(messages.message, messages.flag, currentLang)
      const fetch = async () => {
        await getMaterialsData(dispatch, '', 'CLEAR_MESSAGE')
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

  return (
    <div>
      {currentUser && currentUser[0] ? (
        <div>
          <MainComponent currentUser={currentUser} id={id} />
          <div className="materials-add-block">
            <div className="materials-form-block">
              <div className="materials-block-name">
                {languageHandler(currentLang, 'Name')}:
              </div>
              <input
                type="text"
                value={form.name}
                className="materials-block-name-input"
                name="name"
                onChange={(e) => {
                  changeHandler(setForm, form, e)
                }}
              ></input>
              {messageFile ? (
                <FILE_LIST filename={messageFile} currentLang={currentLang} />
              ) : (
                <div className="materials-block-file">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="materials-file-input"
                    onChange={(e) => {
                      chooseHandler(setFile, file, e)
                    }}
                  />
                </div>
              )}

              <button
                className="materials-block-button"
                onClick={submitHandler}
              >
                {languageHandler(currentLang, 'Submit')}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default MaterialsFormClassPage
