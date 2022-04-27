const { Router } = require('express')
const router = Router()
// const AttendanceCounter = require('../models/AttendanceCounter')
// const User = require('../models/User')
// const Class = require('../models/Class')
const AttendanceCounterValidator = require('../validators/attendanceCounter-validator')
const AttendanceCounterController = require('../controllers/attendanceCounter-controller')

router.post(
  '/set_count',
  AttendanceCounterValidator.set_count,
  AttendanceCounterController.set_count,
)

// router.post('/get_count', async (req, res) => {
//   try {
//     const { class_, id } = req.body

//     if (!class_[23] || !id[23]) {
//       return res
//         .status(400)
//         .json({ message: '[INFO] Incorrect data!', flag: '' })
//     }

//     const UserDb = await User.findById(id)
//     const ClassDb = await Class.findById(class_)

//     if (!UserDb) {
//       return res
//         .status(400)
//         .json({ message: '[INFO] User not found!', flag: '' })
//     }
//     if (!ClassDb) {
//       return res
//         .status(400)
//         .json({ message: '[INFO] Class not found!', flag: '' })
//     }

//     if (UserDb.role === 'Student') {
//       return res
//         .status(403)
//         .json({ message: '[INFO] No permission!', flag: '' })
//     }

//     const AttendanceCounterDb = await AttendanceCounter.findOne({
//       class: class_,
//     })

//     if (!AttendanceCounterDb) {
//       return res.status(400).json({ message: '[INFO] Not found!', flag: '' })
//     }

//     return res.status(200).json({ counter: AttendanceCounterDb.counter })
//   } catch (e) {
//     console.log(e)
//   }
// })

// router.post('/set_count', async (req, res) => {
//   try {
//     const { class_, id } = req.body

//     const UserDb = await User.findById(id)
//     const ClassDb = await Class.findById(class_)

//     if (!UserDb) {
//       return res
//         .status(400)
//         .json({ message: '[INFO] User not found!', flag: '' })
//     }
//     if (!ClassDb) {
//       return res
//         .status(400)
//         .json({ message: '[INFO] Class not found!', flag: '' })
//     }

//     if (UserDb.role === 'Student') {
//       return res
//         .status(403)
//         .json({ message: '[INFO] No permission!', flag: '' })
//     }

//     const AttendanceCounterDb = await AttendanceCounter.findOne({
//       class: class_,
//     })

//     let created = false

//     if (!AttendanceCounterDb) {
//       const AttendanceCounterEX = new AttendanceCounter({
//         class: class_,
//         counter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         dateUpdate: new Date().toLocaleDateString(),
//       })

//       created = true
//       await AttendanceCounterEX.save()
//     }

//     const AttendanceCounterDbUpdate = await AttendanceCounter.findOne({
//       class: class_,
//     })

//     if (
//       Date.parse(new Date().toLocaleDateString()) -
//         Date.parse(AttendanceCounterDbUpdate.dateUpdate) <
//         72000 &&
//       !created
//     ) {
//       return res.status(200).json({ message: '[INFO] Day not finish.' })
//     }

//     counter = AttendanceCounterDbUpdate.counter.map((elem, i) => {
//       if (i === Number('08.05.2022'.split('.')[1].split('0').join('')) - 1) {
//         return elem + 1
//       } else {
//         return elem
//       }
//     })

//     AttendanceCounterDbUpdate.counter = counter
//     AttendanceCounterDbUpdate.dateUpdate = new Date().toLocaleDateString()
//     await AttendanceCounterDbUpdate.save()

//     return res.status(200).json({ message: '[INFO] Succses' })
//   } catch (e) {
//     console.log(e)
//   }
// })

module.exports = router
