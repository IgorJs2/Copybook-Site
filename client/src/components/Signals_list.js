import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSignalsData } from '../redux/apiSignals'
import NotFound from './NotFound'

const Signals_lists = ({ id, currentLang }) => {
  const dispatch = useDispatch()
  const { userId } = useSelector((state) => state.auth)
  const { currentSignals } = useSelector((state) => state.signals)

  useEffect(() => {
    if (userId && id) {
      const fetch = async () => {
        await getSignalsData(dispatch, id, 'GET_SIGNALS')
      }
      fetch()
    }
  }, [dispatch, userId, id])

  return (
    <div>
      {currentSignals && currentSignals.findSignals ? (
        <div className="signals-block-main">
          {currentSignals.findSignals.map((elem, i) => {
            let element =
              currentSignals.findSignals[
                currentSignals.findSignals.length - i - 1
              ]
            return (
              <div>
                <NavLink
                  className="signals-block-main-post"
                  to={`/class/${id}/signals/${element.title}`}
                >
                  <div className="signals-block-main-name" key={element._id}>
                    {element.name_st}
                  </div>
                  <div className="signals-block-main-data">{element.date}</div>
                </NavLink>
              </div>
            )
          })}
        </div>
      ) : (
        <NotFound currentLang={currentLang} />
      )}
    </div>
  )
}

export default Signals_lists
