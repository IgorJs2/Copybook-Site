import React from 'react'
import { languageHandler } from '../handlers/languageHandler'

export const Student_grade_list = ({ grades, currentLang }) => {
  return (
    <div className="student_grade-block">
      {grades.map((elem, i) => {
        return (
          <div className="student_grade-block-element">
            <div className="student_grade-block-element-text_first">
              <div>{languageHandler(currentLang, elem.type)}</div>
              <div>{elem.name !== 'NONE' ? elem.name : elem.date}</div>
            </div>
            <div className="student_grade-block-element-grade">
              {elem.rate}
              <i class="bx bx-award"></i>
            </div>
          </div>
        )
      })}
    </div>
  )
}
