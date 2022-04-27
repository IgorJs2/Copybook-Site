import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getNewsData } from '../redux/apiNews'
import { languageHandler } from '../handlers/languageHandler'
import NotFound from './NotFound'

const News_lists = ({ id, currentLang }) => {
  const dispatch = useDispatch()
  const { userId } = useSelector((state) => state.auth)
  const { currentNews } = useSelector((state) => state.news)

  useEffect(() => {
    if (userId && id) {
      const fetch = async () => {
        await getNewsData(dispatch, id, 'GET_NEWS')
      }
      fetch()
    }
  }, [dispatch, id, userId])

  return (
    <>
      {currentNews && currentNews.findNews && currentNews.findNews[0] ? (
        <div className="news-block-main">
          {currentNews.findNews.map((elem, i) => {
            let element =
              currentNews.findNews[currentNews.findNews.length - i - 1]
            return (
              <div>
                <NavLink
                  className="news-block-main-post"
                  to={`/class/${id}/news/${element.title}`}
                >
                  <div className="news-block-main-name" key={element._id}>
                    {element.title}
                  </div>
                  <div className="news-block-main-data">{element.date}</div>
                </NavLink>
              </div>
            )
          })}
        </div>
      ) : (
        <NotFound currentLang={currentLang} />
      )}
    </>
  )
}

export default News_lists
