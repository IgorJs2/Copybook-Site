import React, { useEffect } from 'react'
import { useRoutes } from './route'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { authApi } from './redux/apiAuth'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    authApi(dispatch, '', 'AUTH')
  }, [dispatch])

  const { isAuth } = useSelector((state) => state.auth)
  const routes = useRoutes(isAuth)

  return (
    <BrowserRouter>
      {isAuth}
      <div className="container">{routes}</div>
    </BrowserRouter>
  )
}

export default App
