import React from 'react'
import { NavLink } from 'react-router-dom'
import { languageHandler } from '../handlers/languageHandler'

const Classes_list = ({ currentUser, lang }) => {
  return (
    <div className="list-class">
      {currentUser[0].classes.map((elem, i) => {
        if (currentUser[1][i]) {
          return (
            <div className="cls">
              <div className="name_class_4sym">{currentUser[1][i].name}</div>
              {currentUser[0].role === 'Student' ? (
                <div className="name_class_teach">
                  {languageHandler(lang, 'ClassPage_component_teacher')}
                  :&nbsp;&nbsp;{currentUser[1][i].teacherLogin}
                </div>
              ) : (
                <div className="name_class_teach">
                  {languageHandler(lang, 'ClassPage_component_students')}:{' '}
                  {currentUser[1][i].nb_of_student}/30
                </div>
              )}

              <NavLink
                to={'/class/' + currentUser[1][i]._id.toString()}
                className="butt_class_enter"
              >
                {languageHandler(lang, 'ClassPage_component_enter')}
              </NavLink>
            </div>
          )
        } else {
          return <div></div>
        }
      })}
    </div>
  )
}

export default Classes_list
