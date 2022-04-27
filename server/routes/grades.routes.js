const { Router } = require('express')
const GradeController = require('../controllers/grade-controller')
const GradeValidator = require('../validators/grade-validator')
const router = Router()
// const Grades = require('../models/Grades')
// const User = require('../models/User')
// const Homeworks = require('../models/Homeworks')
// const Status = require('../models/Status')
// const Class = require('../models/Class')

router.post(
  '/grade_create',
  GradeValidator.gr_create,
  GradeController.gr_create,
)
router.post(
  '/estimate_homework',
  GradeValidator.es_homework,
  GradeController.es_homework,
)
router.post(
  '/homework_to_estimate',
  GradeValidator.homework_to_es,
  GradeController.homework_to_es,
)
router.post(
  '/get_grades',
  GradeValidator.get_grades,
  GradeController.get_grades,
)

// router.post('/gr_create', async (req, res) => {
//   const {
//     choosenStudent,
//     attendance,
//     grade,
//     date,
//     description,
//     type,
//     class_,
//   } = req.body

//   if (!choosenStudent) {
//     return res.status(400).json({
//       message: '[INFO] Please choose students or student!',
//       flag: '#EAC15A',
//     })
//   }
//   if (!date) {
//     return res
//       .status(400)
//       .json({ message: '[INFO] Please choose date!', flag: '#EAC15A' })
//   }
//   if (!description) {
//     return res
//       .status(400)
//       .json({ message: '[INFO] Please write description!', flag: '#EAC15A' })
//   }
//   if (attendance) {
//     choosenStudent.map(async (elem) => {
//       const Student = await User.findOne({ login: elem })

//       const gradeDB = new Grades({
//         students: Student._id,
//         attendance,
//         type: 'ATTENDANCE',
//         grade: 'NONE',
//         date,
//         description: 'NONE',
//         class: class_,
//       })

//       await gradeDB.save()
//     })
//   }

//   choosenStudent.map(async (elem) => {
//     const Student = await User.findOne({ login: elem })

//     const gradeDB = new Grades({
//       students: Student._id,
//       attendance: null,
//       type,
//       grade,
//       date,
//       description,
//       class: class_,
//     })

//     await gradeDB.save()
//   })

//   return res
//     .status(200)
//     .json({ message: '[INFO] Grades was maked!', flag: '#66D9BD' })
// })

// router.post('/es_homework', async (req, res) => {
//   const {
//     choosenStudent,
//     grade,
//     description,
//     name_homework,
//     student,
//     class_,
//   } = req.body

//   try {
//     choosenStudent.map(async (elem) => {
//       const Student = await User.findOne({ login: elem })
//       const StatusCheck = await Status.findOne({ object: name_homework })
//       const ClassDb = await Class.findById(class_)

//       if (Student && StatusCheck && ClassDb) {
//         const gradeDB = new Grades({
//           students: Student._id,
//           attendance: null,
//           type: 'HOMEWORK',
//           grade,
//           date: new Date().toLocaleDateString(),
//           description,
//           class: class_,
//         })
//         const statusUpdateStudent = await Status.findOne({
//           object: name_homework,
//           student: Student._id,
//           status: 'CHECKING',
//         })
//         const statusUpdateTeacher = await Status.findOne({
//           object: name_homework,
//           student: ClassDb.teacher,
//           status: 'CHECKING',
//           student_login: { $exists: false },
//         })

//         if (statusUpdateStudent && statusUpdateTeacher) {
//           statusUpdateStudent.status = 'REVIEWED' + ' ' + grade
//           statusUpdateTeacher.student_login = Student.login
//           statusUpdateTeacher.status = 'REVIEWED' + ' ' + grade

//           await statusUpdateStudent.save()
//           await statusUpdateTeacher.save()
//           await gradeDB.save()
//         }

//         return res
//           .status(201)
//           .json({ message: '[INFO] Homework rated', flag: '#66D9BD' })
//       }

//       return res.status(400).json({ message: '[INFO] Error please try again' })
//     })
//   } catch (e) {
//     return res
//       .status(500)
//       .json({ message: '[INFO] Server error please try again!' })
//   }
// })

// router.post('/homework_to_es', async (req, res) => {
//   const { student, filename, name, id } = req.body

//   try {
//     const StatusCheck = await Status.findOne({ object: name })
//     const ClassDb = await Class.findById(id)
//     const StudentDb = await User.findById(student)
//     const statusUpdateStudent = await Status.findOne({ object: name, student })
//     if (StatusCheck && StudentDb && ClassDb) {
//       const Homework = new Homeworks({
//         student: StudentDb.login,
//         name,
//         date: new Date().toLocaleDateString(),
//         expire_date: 'NONE',
//         filename,
//         class: id,
//       })
//       const StatusTcDb = new Status({
//         student: ClassDb.teacher,
//         object: name,
//         type: 'HOMEWORK',
//         status: 'CHECKING',
//         class: id,
//       })
//       if (statusUpdateStudent) {
//         statusUpdateStudent.status = 'CHECKING'
//         await statusUpdateStudent.save()
//       } else {
//         const StatusDb = new Status({
//           student: StudentDb._id,
//           object: name,
//           type: 'HOMEWORK',
//           status: 'CHECKING',
//           class: id,
//         })
//         await StatusDb.save()
//       }
//       await Homework.save()
//       await StatusTcDb.save()
//       return res
//         .status(201)
//         .json({ message: '[INFO] Homework rated', flag: '#66D9BD' })
//     }

//     return res.status(400).json({ message: '[INFO] Error please try again' })
//   } catch (e) {
//     console.log(e)
//     return res
//       .status(500)
//       .json({ message: '[INFO] Server error please try again!' })
//   }
// })

module.exports = router
