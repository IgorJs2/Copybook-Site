const { Router } = require('express')
// const { check, validationResult } = require('express-validator')
// const User = require('../models/User')
// const Class = require('../models/Class')
const ClassValidator = require('../validators/class-validator')
const ClassController = require('../controllers/class-controller')
const router = Router()

router.post('/class', ClassValidator.class, ClassController.class)
router.post('/connect_class', ClassValidator.connect, ClassController.connect)
router.post(
  '/disconnect_class',
  ClassValidator.disconnect,
  ClassController.disconnect,
)
router.post('/create_class', ClassValidator.create, ClassController.create)
router.post('/delete_class', ClassValidator.delete, ClassController.delete)
router.post('/get_class', ClassValidator.get_class, ClassController.get_class)

// router.post('/connect', async (req, res) => {
//   try {
//     const { code, student } = req.body
//     const Student = await User.findById(student)

//     const Class_ = await Class.findOne({ code: code })

//     if (code === '') {
//       return res
//         .status(400)
//         .json({ message: '[INFO] Invalid code!', flag: '#EAC15A' })
//     }

//     if (!Class_) {
//       return res
//         .status(400)
//         .json({ message: '[INFO] Class not found!', flag: '#EAC15A' })
//     }

//     if (Student.classes.length === 3) {
//       return res.status(400).json({
//         message: '[INFO] Class limit exceeded!',
//         flag: '#EAC15A',
//       })
//     }

//     if (Student.classes.length !== 0) {
//       const validateArray = Student.classes.map(async (elem) => {
//         const validate = await Class.findById(elem)
//         console.log(validate.code, code)
//         if (validate.code === code) {
//           return res.status(400).json({
//             message: '[INFO] You already in this class!',
//             flag: '#EAC15A',
//           })
//         }
//       })
//     }

//     const user_classes = Student.classes
//     const classId = Class_._id
//     const class_student = Class_.student

//     const user_array = user_classes
//     user_array.push(classId)
//     const class_array = class_student
//     class_array.push(student)

//     const userUpdate = await User.updateOne(
//       { _id: student },
//       {
//         $set: {
//           classes: user_array,
//           nb_of_classes: Student.nb_of_classes + 1,
//         },
//       },
//     )
//     const classesUpdate = await Class.updateOne(
//       { _id: classId.toString() },
//       {
//         $set: {
//           student: class_array,
//           nb_of_student: Class_.nb_of_student + 1,
//         },
//       },
//     )
//     return res
//       .status(200)
//       .json({ message: '[INFO] Class connected!', flag: '#66D9BD' })
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({ message: '[INFO] Router post error!' })
//   }
// })

// router.post(
//   '/create',
//   [
//     check('className', '[INFO] Incorrect name!').isLength({ min: 5 }),
//     check('code', '[INFO] Incorrect code!').isLength({ min: 6 }),
//     check('teacher', '[INFO] Incorect teacher!'),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req)

//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           errors: errors.array(),
//           message: '[INFO] Incorrect data when create class!',
//           flag: '#D1557A',
//         })
//       }

//       const { className, code, teacher } = req.body

//       const classValidateName = await Class.findOne({ name: className })
//       const classValidateCode = await Class.findOne({ code: code })
//       const user = await User.findById(teacher)

//       console.log(user)

//       if (classValidateName || classValidateCode) {
//         return res
//           .status(400)
//           .json({ message: '[INFO] Class duplicates!', flag: '#EAC15A' })
//       }

//       const Teacher = await User.findById(teacher)

//       if (Teacher.classes.length === 3) {
//         return res.status(400).json({
//           message: '[INFO] Class limit exceeded!',
//           flag: '#EAC15A',
//         })
//       }

//       if (Teacher) {
//         const class_ = new Class({
//           teacher: Teacher._id.toString(),
//           teacherLogin: Teacher.login,
//           code: code,
//           name: className,
//           nb_of_student: 0,
//           student: [],
//         })

//         await class_.save()

//         const user_nb_of_classes = user.nb_of_classes
//         const user_classes = user.classes
//         const classId = class_._id
//         const class_nb_of_student = class_.nb_of_student
//         const class_student = class_.student

//         const user_array = user_classes
//         user_array.push(classId)
//         const class_array = class_student

//         const userUpdate = await User.updateOne(
//           { _id: teacher },
//           {
//             $set: {
//               classes: user_array,
//               nb_of_classes: user_nb_of_classes + 1,
//             },
//           },
//         )
//         const classesUpdate = await Class.updateOne(
//           { _id: classId },
//           {
//             $set: {
//               student: class_array,
//               nb_of_student: class_nb_of_student + 1,
//             },
//           },
//         )

//         return res
//           .status(201)
//           .json({ message: '[INFO] Class saved!', flag: '#66D9BD' })
//       }

//       res
//         .status(400)
//         .json({ message: '[INFO] Teacher not found!', flag: '#EAC15A' })
//     } catch (e) {
//       console.log(e)
//       res.status(500).json({ message: '[INFO] Router post error!' })
//     }
//   },
// )

// router.post('/delete', async (req, res) => {
//   try {
//     const { className, code, teacher } = req.body

//     const classes = await Class.findOne({ code: code, name: className })
//     const user = await User.findById(teacher)

//     if (classes) {
//       const user_nb_of_classes = user.nb_of_classes
//       const user_classes = user.classes
//       const user_array = user_classes

//       for (let i = 0; i < user_array.length; i++) {
//         let class_ = await Class.findById(user_array[i].toString())
//         if (class_.code === code) {
//           user_array.splice(i, 1)
//           const userUpdate = await User.updateOne(
//             { _id: teacher },
//             {
//               $set: {
//                 classes: user_array,
//                 nb_of_classes: user_nb_of_classes - 1,
//               },
//             },
//           )
//         }
//       }

//       await classes.deleteOne({ code: code, name: className })

//       return res
//         .status(201)
//         .json({ message: '[INFO] Class Deleted!', flag: '#66D9BD' })
//     }

//     return res
//       .status(400)
//       .json({ message: '[INFO] Class not found!', flag: '#D1557A' })
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({ message: '[INFO] Router post error!' })
//   }
// })

// router.post('/disconnect', async (req, res) => {
//   try {
//     const { name, student } = req.body

//     const Student = await User.findById(student)
//     const Class_ = await Class.findOne({ name: name })

//     if (name === '') {
//       return res
//         .status(400)
//         .json({ message: '[INFO] Invalid name!', flag: '#EAC15A' })
//     }

//     if (!Class_) {
//       return res
//         .status(400)
//         .json({ message: '[INFO] Class not found!', flag: '#EAC15A' })
//     }

//     if (Student.classes.length !== 0) {
//       const validateArray = Student.classes.forEach(async (elem) => {
//         const validate = await Class.findById(elem)
//         if (validate.name !== name) {
//           return res
//             .status(400)
//             .json({ message: '[INFO]You not in this class!', flag: '#D1557A' })
//         }
//       })
//     } else {
//       return res
//         .status(400)
//         .json({ message: '[INFO]You not in this class!', flag: '#D1557A' })
//     }

//     const user_classes = Student.classes
//     const classId = Class_._id
//     const class_student = Class_.student

//     const user_array = user_classes
//     const class_array = class_student

//     for (let i = 0; i < class_array.length; i++) {
//       if (class_array[i] === Student._id.toString()) {
//         class_array.splice(i, 1)
//       }
//     }

//     for (let i = 0; i < user_array.length; i++) {
//       if (user_array[i].toString() === Class_._id.toString()) {
//         user_array.splice(i, 1)
//       }
//     }

//     const userUpdate = await User.updateOne(
//       { _id: student },
//       {
//         $set: {
//           classes: user_array,
//           nb_of_classes: Student.nb_of_classes - 1,
//         },
//       },
//     )
//     const classesUpdate = await Class.updateOne(
//       { _id: classId.toString() },
//       {
//         $set: {
//           student: class_array,
//           nb_of_student: Class_.nb_of_student - 1,
//         },
//       },
//     )

//     return res
//       .status(200)
//       .json({ message: '[INFO] Class disconnected!', flag: '#66D9BD' })
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({ message: '[INFO] Router post error!' })
//   }
// })

// router.post('/get_cl', async (req, res) => {
//   try {
//     const { id } = req.body

//     const classes = await Class.findById(id)

//     if (classes) {
//       return res.send(classes)
//     }

//     return res
//       .status(401)
//       .json({ message: '[INFO] Class not found!', flag: '#D1557A' })
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({ message: '[INFO] Router post error!' })
//   }
// })

module.exports = router
