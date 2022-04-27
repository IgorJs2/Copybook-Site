import React from 'react'
import { languageHandler } from '../handlers/languageHandler'

const NotFound = ({ currentLang }) => {
  return (
    <div className="not-found">{languageHandler(currentLang, 'NOTFOUND')}</div>
  )
}

export default NotFound
