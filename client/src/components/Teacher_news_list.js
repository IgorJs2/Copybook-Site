import React from 'react'
import { languageHandler } from '../handlers/languageHandler'

export const Teacher_news_list = ({ news, deleteHandler, currentLang }) => {
  return (
    <div className="teacher-news-block">
      {news.map((elem, i) => {
        return (
          <div className="teacher-news-block-element">
            <div className="teacher-news-block-element-text_first">
              <div>{elem.name}</div>
              <div>{elem.date}</div>
            </div>
            <div
              className="teacher-news-block-element-news"
              onClick={deleteHandler}
              data-news={elem.name}
            >
              {languageHandler(currentLang, 'Delete')}
            </div>
          </div>
        )
      })}
    </div>
  )
}
