const { Router } = require('express')
// const User = require('../models/User')
// const Materials = require('../models/Materials')
// const Homeworks = require('../models/Homeworks')
// const Status = require('../models/Status')
// const Class = require('../models/Class')
const StatusValidator = require('../validators/status-validator')
const StatusController = require('../controllers/status-controller')
const router = Router()

router.post(
  '/set_status',
  StatusValidator.st_status,
  StatusController.st_status,
)
router.post(
  '/get_status',
  StatusValidator.gt_status,
  StatusController.gt_status,
)

// router.post('/st_status', async (req, res) => {
//   try {
//     const { student, object, status, name, class_ } = req.body

//     if (!student) {
//       return res
//         .status(400)
//         .json({ message: '[INFO] Student not found!', flag: '#EAC15A' })
//     }

//     if (!object && !name) {
//       return res
//         .status(400)
//         .json({ message: '[INFO] Object not found!', flag: '#EAC15A' })
//     }

//     if (!status) {
//       return res
//         .status(400)
//         .json({ message: '[INFO] Status not found!', flag: '#EAC15A' })
//     }

//     const StudentDb = await User.findById(student)
//     const HomeworkDb = await Homeworks.findById(object)
//     const MaterialDb = await Materials.findById(object)

//     let objectDb
//     let type

//     if (HomeworkDb) {
//       objectDb = HomeworkDb
//       type = 'HOMEWORK'
//     } else if (MaterialDb) {
//       objectDb = MaterialDb
//       type = 'MATERIAL'
//     } else {
//       return res.status(400).json({ message: '[INFO] Not find object' })
//     }

//     const StatusDb = new Status({
//       student,
//       object: objectDb.name,
//       type,
//       status,
//       class: class_,
//     })

//     await StatusDb.save()

//     return res.status(201).json({ message: '[INFO] Success saved' })
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({ message: '[INFO] Router post error!' })
//   }
// })

// router.post('/gt_status', async (req, res) => {
//   try {
//     const { student, object, class_ } = req.body
//     const StudentDb = await User.findById(student)

//     if (!student && !StudentDb) {
//       return res
//         .status(400)
//         .json({ message: '[INFO] Student not found!', flag: '#EAC15A' })
//     }

//     const UserStatusArray = await Status.find({ student })

//     const ClassDb = await Class.findById(class_)
//     if (ClassDb) {
//       const HomeworksAll = await Homeworks.find({ class: class_ })
//       HomeworksAll.map(async (elem) => {
//         let check = false
//         UserStatusArray.map(async (element, i) => {
//           if (element.object === elem.name) {
//             check = true
//           }
//         })
//         if (
//           Date.parse(elem.expire_date) < Date.now() &&
//           !check &&
//           StudentDb.role !== 'Teacher'
//         ) {
//           const StatusExpired = new Status({
//             student,
//             object: elem.name,
//             type: 'HOMEWORK',
//             status: 'EXPIRED',
//             class: class_,
//           })

//           await StatusExpired.save()
//         }
//       })
//     }

//     const UserStatus = await Status.find({ student, class: class_ })

//     let ResponseArray = []

//     UserStatus.map(async (elem, i) => {
//       if (elem.type === object) {
//         if (elem.student_login) {
//           ResponseArray.push({
//             name: elem.object,
//             status: elem.status,
//             student_login: elem.student_login,
//           })
//         } else {
//           ResponseArray.push({ name: elem.object, status: elem.status })
//         }
//       }
//     })

//     return res.send(ResponseArray)
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({ message: '[INFO] Router post error!' })
//   }
// })

module.exports = router
