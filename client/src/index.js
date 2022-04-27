import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './style/index.css'
import 'materialize-css'
import App from './App'
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
