const { Router } = require('express')
const HomeworkController = require('../controllers/homework-controller')
const HomeworkValidator = require('../validators/homework-validator')
// const { check, validationResult } = require('express-validator')
// const Homeworks = require('../models/Homeworks')
// const User = require('../models/User')
const router = Router()

router.post(
  '/create_homework',
  HomeworkValidator.cr_homework,
  HomeworkController.cr_homework,
)
router.post(
  '/get_homeworks',
  HomeworkValidator.gt_homeworks,
  HomeworkController.gt_homeworks,
)
router.post(
  '/delete_homework',
  HomeworkValidator.dl_homework,
  HomeworkController.dl_homework,
)

// router.post(
//   '/cr_homework',

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

//       const { student, filename, name, id, date, link } = req.body

//       if (!filename) {
//         return res
//           .status(400)
//           .json({ message: '[INFO] Please choose file!', flag: '#EAC15A' })
//       }

//       const name_check = await Homeworks.findOne({ name })

//       if (name_check && !link) {
//         return res
//           .status(400)
//           .json({ message: '[INFO] Duplicate name', flag: '#EAC15A' })
//       }

//       const day = new Date()

//       if (!link) {
//         const Homework = new Homeworks({
//           name,
//           date: day.toLocaleDateString(),
//           expire_date: date,
//           filename,
//           class: id,
//         })
//         await Homework.save()
//       }

//       return res
//         .status(200)
//         .json({ message: '[INFO] Homework send', flag: '#66D9BD' })
//     } catch (error) {}
//   },
// )

// router.post('/gt_homeworks', async (req, res) => {
//   try {
//     const { id, link } = req.body

//     const UserDb = await User.findById(link)

//     if (UserDb.role === 'Teacher') {
//       const findHomeworks = await Homeworks.find({ class: id }).sort({
//         date: -1,
//       })
//       return res.send({ findHomeworks })
//     } else if (UserDb.role === 'Student') {
//       const findHomeworks = await Homeworks.find({
//         class: id,
//         expire_date: { $ne: 'NONE' },
//       }).sort({
//         date: -1,
//       })
//       return res.send({ findHomeworks })
//     }
//   } catch (e) {
//     res.status(500).json({ message: '[INFO] Data get error!' })
//   }
// })

// router.post('/dl_homework', async (req, res) => {
//   try {
//     const { name } = req.body

//     if (name) {
//       await Homeworks.deleteOne({ name, student: { $ne: null } })
//     }
//     return res.status(200).json({ message: '[INFO] Succses' })
//   } catch (e) {}
// })

module.exports = router
