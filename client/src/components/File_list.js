import React from 'react'
import '../style/NewsClassPage.css'
import { useDispatch } from 'react-redux'
import { languageHandler } from '../handlers/languageHandler'
import Loader from './Loader'
import { getFileData } from '../redux/apiFile'

const File_list = ({ filename, FN, currentLang }) => {
  const dispatch = useDispatch()

  const clickHandler = async () => {
    await getFileData(dispatch, filename, 'DELETE_FILE')
    if (FN) {
      FN()
    }
  }

  return (
    <div className="file-list">
      {filename ? (
        <div className="file-block">
          <div className="file-name">{filename.split('-')[1]}</div>
          <div className="file-block-button">
            <button onClick={clickHandler} className="file-button">
              {languageHandler(currentLang, 'Remove')}
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default File_list
