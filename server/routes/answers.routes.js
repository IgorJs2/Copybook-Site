const { Router } = require('express')
// const { check, validationResult } = require('express-validator')
// const User = require('../models/User')
// const Class = require('../models/Class')
// const Answers = require('../models/Answers')
// const Signals = require('../models/Signals')
const AnswerController = require('../controllers/answer-controller')
const AnswerValidator = require('../validators/answer-validator')
const router = Router()

router.post(
  '/create_answer',
  AnswerValidator.create_answer,
  AnswerController.create_answer,
)
router.post(
  '/get_answers',
  AnswerValidator.get_answers,
  AnswerController.get_answers,
)
router.post(
  '/get_answer',
  AnswerValidator.get_answer,
  AnswerController.get_answer,
)

// router.post(
//   '/cr_answers',
//   [check('answer', '[INFO] Incorrect text!').isLength({ min: 6, max: 1500 })],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req)

//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           errors: errors.array(),
//           message: '[INFO] Incorrect data in form!',
//           flag: '#D1557A',
//         })
//       }

//       const { answer, class_, teacher, signal, student } = req.body
//       const signals_check = await Signals.findOne({ title: signal })

//       if (!signals_check) {
//         return res
//           .status(400)
//           .json({ message: '[INFO] Signals not found!', flag: '#EAC15A' })
//       }

//       const class_check = await Class.findOne({ _id: class_ })

//       if (!class_check) {
//         return res
//           .status(400)
//           .json({ message: '[INFO] Class not found!', flag: '#EAC15A' })
//       }

//       const teacher_check = await User.findOne({ _id: teacher })
//       if (!teacher_check) {
//         return res
//           .status(400)
//           .json({ message: '[INFO] Teacher not found!', flag: '#EAC15A' })
//       }

//       const student_check = await User.findOne({ login: student })
//       if (!student_check) {
//         return res
//           .status(400)
//           .json({ message: '[INFO] Student not found!', flag: '#EAC15A' })
//       }

//       const date = new Date()

//       const answerObj = new Answers({
//         teacher,
//         student,
//         answer,
//         signal,
//         class: class_,
//         date: date.toLocaleDateString(),
//       })

//       await answerObj.save()

//       res.status(201).json({ message: '[INFO] Answer send!', flag: '#66D9BD' })
//     } catch (e) {
//       console.log(e)
//       res.status(500).json({ message: '[INFO] Router post error!' })
//     }
//   },
// )

// router.post('/gt_answers', async (req, res) => {
//   try {
//     const { user, class_ } = req.body

//     if (user && class_) {
//       const UserDb = await User.findById(user)

//       const findAnswers = await Answers.find({
//         student: UserDb.login,
//         class: class_,
//       })
//       return res.send({ findAnswers })
//     }

//     return
//   } catch (e) {
//     res.status(500).json({ message: '[INFO] Data get error!' })
//   }
// })

module.exports = router
