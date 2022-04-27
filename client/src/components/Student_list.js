import { useDispatch } from 'react-redux'
import { getStudentData } from '../redux/apiStudents'

const Student_list = ({ students }) => {
  const dispatch = useDispatch()

  const removeHandler = async (event) => {
    let array = students.filter(
      (elem) => elem !== event.target.attributes.name.nodeValue,
    )
    getStudentData(dispatch, array, 'SET_STUDENT')
  }

  return (
    <div className="student_list">
      {students.map((elem, i) => {
        return (
          <div className="student_list_block">
            <div className="student_list_name">{elem}</div>
            <i
              class="bx bx-message-square-x"
              onClick={removeHandler}
              name={elem}
            ></i>
          </div>
        )
      })}
    </div>
  )
}

export default Student_list
