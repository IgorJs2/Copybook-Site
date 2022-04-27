import React from 'react'

export const Student_rate_list = ({ users }) => {
  return (
    <div className="student_rate-block">
      {users.map((elem, i) => {
        return (
          <div className="student_rate-block-element">
            <div className="student_rate-block-number">{i + 1 + '. '}</div>
            <div className="student_rate-block-name">{elem.name}</div>
            <div className="student_rate-block-rate">
              {elem.rate}
              <i class="bx bx-award"></i>
            </div>
          </div>
        )
      })}
    </div>
  )
}
