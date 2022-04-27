import React from 'react'
import { languageHandler } from '../handlers/languageHandler'
import FILE_LIST from '../components/File_list'

export const Homework_list_Student_Modal = ({
  submitHandler,
  messageFile,
  close,
  currentLang,
}) => {
  return (
    <div className="homework-modal">
      <FILE_LIST filename={messageFile} FN={close} currentLang={currentLang} />
      <div className="homework-modal-block">
        <button className="homework-modal-submit" onClick={submitHandler}>
          {languageHandler(currentLang, 'Submit')}
        </button>
        <button className="homework-modal-close" onClick={close}>
          {languageHandler(currentLang, 'Close')}
        </button>
      </div>
    </div>
  )
}
