import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAnswersData } from '../redux/apiAnswers'
import NotFound from './NotFound'

const Answer_lists = ({ user, id, currentLang }) => {
  const dispatch = useDispatch()
  const { userId } = useSelector((state) => state.auth)
  const { currentAnswers } = useSelector((state) => state.answers)

  useEffect(() => {
    if (userId && user && user[0] && id) {
      getAnswersData(dispatch, { user: user[0]._id, class_: id }, 'GET_ANSWERS')
    }
  }, [userId, user, id, dispatch])

  return (
    <>
      {currentAnswers &&
      currentAnswers.findAnswers &&
      currentAnswers.findAnswers[0] ? (
        <>
          {currentAnswers.findAnswers.map((elem, i) => {
            let element =
              currentAnswers.findAnswers[
                currentAnswers.findAnswers.length - i - 1
              ]
            return (
              <div className="answers-block-main">
                <NavLink
                  className="answers-block-main-post"
                  to={`/class/${id}/answers/${element.signal}`}
                >
                  <div className="answers-block-main-name" key={element._id}>
                    {element.signal}
                  </div>
                  <div className="answers-block-main-data">{element.date}</div>
                </NavLink>
              </div>
            )
          })}
        </>
      ) : (
        <NotFound currentLang={currentLang} />
      )}
    </>
  )
}

export default Answer_lists
