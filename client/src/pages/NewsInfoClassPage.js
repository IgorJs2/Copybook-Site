import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../redux/apiUser'
import { getNewsData } from '../redux/apiNews'
import { getLanguageData } from '../redux/apiLanguage'
import { languageHandler } from '../handlers/languageHandler'
import { redirectHandler } from '../handlers/redirectHandler'
import MainComponent from '../components/MainComponent'
import Loader from '../components/Loader'
import Page404 from '../pages/Page404'
import FILE_DOWNLOAD from '../components/File_Download'
import '../style/NewsInfoClassPage.css'

const NewsInfoClassPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
  const { currentNews } = useSelector((state) => state.news)
  const { userId } = useSelector((state) => state.auth)
  const { currentLang } = useSelector((state) => state.language)
  const id = window.location.pathname.split('/')[2]
  const title = decodeURI(window.location.pathname.split('/')[4])

  useEffect(() => {
    if (userId && id) {
      const fetch = async () => {
        await getLanguageData(dispatch, {}, 'GET_LANGUAGE')
        await getUserData(dispatch, userId, 'GET_USER_DATA')
        await getNewsData(dispatch, { title: title }, 'GET_NEWS')
      }
      fetch()
    }
  }, [userId, id, title, dispatch])

  return (
    <div>
      {currentUser &&
      currentNews &&
      currentNews.findNewsByTitle &&
      currentUser[0].role ? (
        <div>
          {currentUser[0].role === 'Student' ? (
            <>
              <MainComponent currentUser={currentUser} id={id} />
              <div className="news-info">
                <div className="news-text-block">
                  <div className="news-info-title">
                    {currentNews.findNewsByTitle.title}
                  </div>
                  <div className="news-info-date">
                    {currentNews.findNewsByTitle.date}
                  </div>
                </div>
                <div className="news-info-block">
                  {currentNews.findNewsByTitle.text}
                </div>
                {currentNews.findNewsByTitle.file ? (
                  <div className="news-info-file">
                    <div className="news-info-file-name">
                      {currentNews.findNewsByTitle.file.split('-')[1]}
                    </div>
                    <FILE_DOWNLOAD
                      src={currentNews.findNewsByTitle.file}
                      UI={'news-info-file-download'}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className="button-news-redirect">
                  <button
                    className="button-lg-news-redirect"
                    onClick={(e) => {
                      redirectHandler(history, id, 'news')
                    }}
                  >
                    {languageHandler(currentLang, 'Back')}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Page404 />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default NewsInfoClassPage
