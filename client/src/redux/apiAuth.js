import {
  login,
  logout,
  auth,
  register,
  forgot,
  change_password,
  deleteMessages,
} from '../redux/authRedux'
import { clearStateN } from '../redux/newsRedux'
import { clearStateU } from '../redux/userRedux'
import { clearStateC } from '../redux/classRedux'
import { clearStateG } from '../redux/gradesRedux'
import { clearStateA } from '../redux/answersRedux'
import { clearStateH } from '../redux/homeworksRedux'
import { clearStateS } from '../redux/signalsRedux'
import { clearStateST } from '../redux/studentsRedux'
import { clearStateM } from '../redux/materialsRedux'
import { clearStateAtt } from '../redux/attendanceRedux'
import axios from 'axios'

export const authApi = async (dispatch, data, action) => {
  if (action === 'LOGIN') {
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataAnswers = await response.json()
      dispatch(login(dataAnswers))
    } catch (err) {
      console.log(err)
    }
  }

  if (action === 'REGISTER') {
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/auth/register/', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataAnswers = await response.json()
      dispatch(register(dataAnswers))
    } catch (err) {
      console.log(err)
    }
  }

  if (action === 'LOGOUT') {
    try {
      dispatch(clearStateN())
      dispatch(clearStateU())
      dispatch(clearStateC())
      dispatch(clearStateG())
      dispatch(clearStateA())
      dispatch(clearStateH())
      dispatch(clearStateS())
      dispatch(clearStateST())
      dispatch(clearStateM())
      dispatch(clearStateAtt())
      dispatch(logout())
    } catch (err) {
      console.log(err)
    }
  }

  if (action === 'AUTH') {
    try {
      try {
        if (JSON.parse(localStorage.getItem('userData'))) {
          const response = await axios.get(`/api/auth/auth`, {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('userData')).token
              }`,
            },
          })
          dispatch(auth(response))
        }
      } catch (err) {
        console.log(err)
      }
    } catch (err) {
      console.log(err)
      localStorage.removeItem('userData')
    }
  }
  if (action === 'FORGOT') {
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/auth/forgot/', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const responseData = await response.json()

      dispatch(forgot(responseData))
    } catch (err) {
      console.log(err)
    }
  }
  if (action === 'CHANGE_PASSWORD') {
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/auth/change_password/', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const responseData = await response.json()
      dispatch(change_password(responseData))
    } catch (err) {
      console.log(err)
    }
  }
  if (action === 'CLEAR_MESSAGE') {
    dispatch(deleteMessages())
  }
}
