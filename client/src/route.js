import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ChangePasswordPage from './pages/ChangePasswordPage'
import MainClassPage from './pages/MainClassPage'
import ClassPage from './pages/ClassPage'
import CreateClassPage from './pages/CreateClassPage'
import DeleteClassPage from './pages/DeleteClassPage'
import SignalsClassPage from './pages/SignalsClassPage'
import NewsClassPage from './pages/NewsClassPage'
import NewsInfoClassPage from './pages/NewsInfoClassPage'
import ConnectClassPage from './pages/ConnectClassPage'
import DisconnectClassPage from './pages/DisconnectClassPage'
import SignalsInfoClassPage from './pages/SignalsInfoClassPage'
import SignalsAnswerClassPage from './pages/SignalsAnswerClassPage'
import AnswerClassPage from './pages/AnswerClassPage'
import AnswersInfoClassPage from './pages/AnswersInfoClassPage'
import MaterialsClassPage from './pages/MaterialsClassPage'
import MaterialsFormClassPage from './pages/MaterialsFormClassPage'
import HomeworksClassPage from './pages/HomeworksClassPage'
import HomeworksFormClassPage from './pages/HomeworksFormClassPage'
import GradesClassPage from './pages/GradesClassPage'
import ProgressClassPage from './pages/ProgressClassPage'

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/classes" exact>
          <ClassPage />
        </Route>

        <Route path="/class/:id" component={MainClassPage} exact />
        <Route path="/class/:id/progress" component={ProgressClassPage} exact />
        <Route path="/class/:id/signals" component={SignalsClassPage} exact />
        <Route path="/class/:id/news" component={NewsClassPage} exact />
        <Route
          path="/class/:id/news/:title"
          component={NewsInfoClassPage}
          exact
        />
        <Route
          path="/class/:id/signals/:name"
          component={SignalsInfoClassPage}
          exact
        />
        <Route path="/class/:id/answers" component={AnswerClassPage} exact />
        <Route
          path="/class/:id/answer/:title"
          component={SignalsAnswerClassPage}
          exact
        />
        <Route
          path="/class/:id/answers/:title"
          component={AnswersInfoClassPage}
          exact
        />
        <Route
          path="/class/:id/materials"
          component={MaterialsClassPage}
          exact
        />
        <Route
          path="/class/:id/materials/add"
          component={MaterialsFormClassPage}
          exact
        />
        <Route
          path="/class/:id/homeworks"
          component={HomeworksClassPage}
          exact
        />
        <Route
          path="/class/:id/homeworks/add"
          component={HomeworksFormClassPage}
          exact
        />
        <Route path="/class/:id/grades" component={GradesClassPage} exact />
        <Route path="/connect-class" exact>
          <ConnectClassPage />
        </Route>
        <Route path="/disconnect-class" exact>
          <DisconnectClassPage />
        </Route>
        <Route path="/create-class" exact>
          <CreateClassPage />
        </Route>
        <Route path="/del-class" exact>
          <DeleteClassPage />
        </Route>
        <Redirect to="/classes" />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Route path="/register" exact>
        <RegisterPage />
      </Route>
      <Route path="/forgot" exact>
        <ForgotPasswordPage />
      </Route>
      <Route path="/forgot/:link" exact>
        <ChangePasswordPage />
      </Route>
      <Route path="/" exact>
        <LoginPage />
      </Route>
      <Redirect to="/login" />
    </Switch>
  )
}
