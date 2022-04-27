import React from 'react'
import { languageHandler } from '../handlers/languageHandler'

const ProgressAll_grades_student_list = ({
  data,
  search,
  currentLang,
  role,
}) => {
  if (search) {
    return (
      <div className="student_grades-block">
        {data.grades.map((elem, i) => {
          if (
            role === 'Teacher' &&
            elem.type === 'ATTENDANCE' &&
            elem.student.includes(search)
          ) {
            return (
              <div className="student_grades-block-element">
                <div className="student_grades-block-element-text">
                  <div className="student_grades-block-element-text_second">
                    {languageHandler(currentLang, 'Student')}: {elem.student}
                  </div>
                </div>
                <div className="student_grades-block-element-date">
                  {elem.date}
                </div>
                <div
                  className={
                    'student_grades-block-element-grade' + ' ' + 'HOMEWORK'
                  }
                >
                  ✓
                </div>
              </div>
            )
          }
          if (
            (role === 'Teacher' &&
              elem.date.includes(search) &&
              elem.grade !== 'NONE') ||
            (role === 'Teacher' &&
              elem.grade.includes(search) &&
              elem.grade !== 'NONE') ||
            (role === 'Teacher' &&
              elem.Theme.includes(search) &&
              elem.grade !== 'NONE')
          ) {
            return (
              <div className="student_grades-block-element">
                <div className="student_grades-block-element-text">
                  <div className="student_grades-block-element-text_first">
                    {languageHandler(currentLang, 'Theme')}: {elem.Theme}
                  </div>
                  <div className="student_grades-block-element-text_second">
                    {role === 'Teacher' ? (
                      <>
                        {languageHandler(currentLang, 'Student')}:{elem.student}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="student_grades-block-element-date">
                  {elem.date}
                </div>
                <div
                  className={
                    'student_grades-block-element-grade' + ' ' + elem.type
                  }
                >
                  {elem.grade}
                </div>
              </div>
            )
          }
          if (
            (elem.date.includes(search) && elem.grade !== 'NONE') ||
            (elem.grade.includes(search) && elem.grade !== 'NONE') ||
            (elem.Theme.includes(search) && elem.grade !== 'NONE')
          ) {
            return (
              <div className="student_grades-block-element">
                <div className="student_grades-block-element-text">
                  {languageHandler(currentLang, 'Theme')}: {elem.Theme}
                </div>
                <div className="student_grades-block-element-date">
                  {elem.date}
                </div>
                <div
                  className={
                    'student_grades-block-element-grade' + ' ' + elem.type
                  }
                >
                  {elem.grade}
                </div>
              </div>
            )
          }
        })}
      </div>
    )
  }
  return (
    <div className="student_grades-block">
      {data.grades.map((elem, i) => {
        if (
          role === 'Teacher' &&
          data.type &&
          data.type === 'attendance' &&
          elem.type === 'ATTENDANCE'
        ) {
          return (
            <div className="student_grades-block-element">
              <div className="student_grades-block-element-text">
                <div className="student_grades-block-element-text_second">
                  {languageHandler(currentLang, 'Student')}: {elem.student}
                </div>
              </div>
              <div className="student_grades-block-element-date">
                {elem.date}
              </div>
              <div
                className={
                  'student_grades-block-element-grade' + ' ' + 'HOMEWORK'
                }
              >
                ✓
              </div>
            </div>
          )
        }
        if (data.type && elem.type === data.type.toUpperCase()) {
          return (
            <div className="student_grades-block-element">
              <div className="student_grades-block-element-text">
                <div className="student_grades-block-element-text_first">
                  {languageHandler(currentLang, 'Theme')}: {elem.Theme}
                </div>
                <div className="student_grades-block-element-text_second">
                  {role === 'Teacher' ? (
                    <>
                      {languageHandler(currentLang, 'Student')}:{elem.student}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="student_grades-block-element-date">
                {elem.date}
              </div>
              <div
                className={
                  'student_grades-block-element-grade' + ' ' + elem.type
                }
              >
                {elem.grade}
              </div>
            </div>
          )
        } else if (
          (data.type &&
            elem.type !== 'ATTENDANCE' &&
            data.type.toUpperCase() === 'ALL') ||
          (elem.type !== 'ATTENDANCE' && !data.type)
        ) {
          return (
            <div className="student_grades-block-element">
              <div className="student_grades-block-element-text">
                <div className="student_grades-block-element-text_first">
                  {languageHandler(currentLang, 'Theme')}: {elem.Theme}
                </div>
                <div className="student_grades-block-element-text_second">
                  {role === 'Teacher' ? (
                    <>
                      {languageHandler(currentLang, 'Student')}:{elem.student}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="student_grades-block-element-date">
                {elem.date}
              </div>
              <div
                className={
                  'student_grades-block-element-grade' + ' ' + elem.type
                }
              >
                {elem.grade}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default ProgressAll_grades_student_list
