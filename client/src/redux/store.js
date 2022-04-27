import { configureStore } from '@reduxjs/toolkit'
import userRedux from './userRedux'
import newsRedux from './newsRedux.js'
import classRedux from './classRedux.js'
import signalsRedux from './signalsRedux'
import answersRedux from './answersRedux'
import fileRedux from './fileRedux'
import materialsRedux from './materialsRedux'
import homeworksRedux from './homeworksRedux'
import gradesRedux from './gradesRedux'
import studentsRedux from './studentsRedux'
import authRedux from './authRedux'
import statusRedux from './statusRedux'
import languageRedux from './languageRedux'

const reducer = {
  auth: authRedux,
  user: userRedux,
  class: classRedux,
  news: newsRedux,
  signals: signalsRedux,
  answers: answersRedux,
  file: fileRedux,
  materials: materialsRedux,
  homeworks: homeworksRedux,
  grades: gradesRedux,
  student: studentsRedux,
  status: statusRedux,
  language: languageRedux,
}

export default configureStore({
  reducer,
})
