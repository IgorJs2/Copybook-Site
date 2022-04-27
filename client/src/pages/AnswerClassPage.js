import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getUserData } from '../redux/apiUser'
import { getLanguageData } from '../redux/apiLanguage'
import Loader from '../components/Loader'
import ANSWER_LIST from '../components/Answer_list'
import MainComponent from '../components/MainComponent'
import '../style/SignalsAnswerClassPage.css'

const AnswerClassPage = () => {
  const dispatch = useDispatch()
  const { userId } = useSelector((state) => state.auth)
  const { currentUser } = useSelector((state) => state.user)
  const { currentLang } = useSelector((state) => state.language)

  const id = window.location.pathname.split('/')[2]

  useEffect(() => {
    if (userId) {
      const fetch = async () => {
        await getLanguageData(dispatch, {}, 'GET_LANGUAGE')
        await getUserData(dispatch, userId, 'GET_USER_DATA')
      }
      fetch()
    }
  }, [dispatch, userId])

  return (
    <div>
      {currentUser ? (
        <div>
          <MainComponent currentUser={currentUser} id={id} />
          <ANSWER_LIST user={currentUser} id={id} currentLang={currentLang} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default AnswerClassPage
