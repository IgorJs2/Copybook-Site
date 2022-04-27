const { Router } = require('express')
const router = Router()
const AuthController = require('../controllers/auth-controller')
const AuthValidator = require('../validators/auth-validator')
const authMiddleware = require('../middleware/auth.middleware')
// const { check, validationResult } = require('express-validator')
// const User = require('../models/User')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
// const config = require('config')

router.get('/auth', authMiddleware, AuthController.auth)
router.post('/login', AuthValidator.login, AuthController.login)
router.post('/register', AuthValidator.register, AuthController.register)
router.post('/forgot', AuthValidator.forgot, AuthController.forgot)
router.post(
  '/change_password',
  AuthValidator.change_password,
  AuthController.change_password,
)

// router.get('/auth', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.user.userId })
//     const token = jwt.sign({ userId: user._id }, config.get('jwtSecret'), {
//       expiresIn: '1h',
//     })
//     return res.json({
//       userId: user._id,
//       token,
//     })
//   } catch (e) {
//     console.log(e)
//     res.send({ message: '[INFO] Server error' })
//   }
// })

// router.post(
//   '/login',

//   async (req, res) => {
//     try {
//       const { password, login } = req.body

//       const user = await User.findOne({ login })

//       if (!user) {
//         return res
//           .status(400)
//           .json({ message: '[INFO] User not found!', flag: '#D1557A' })
//       }

//       const isMatchPassword = await bcrypt.compare(password, user.password)

//       if (!isMatchPassword) {
//         return res.status(400).json({
//           message: '[INFO] Incorrect login or password please try again!',
//           flag: '#EAC15A',
//         })
//       }

//       const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
//         expiresIn: '10h',
//       })

//       res.json({ token, userId: user.id })
//     } catch (e) {
//       res.status(500).json({ message: '[INFO] Router post error!' })
//     }
//   },
// )

// router.post(
//   '/register',
//   [
//     check('email', '[INFO] Incorrect email!').isEmail(),
//     check('password', '[INFO] Minimum length of login is 6!').isLength({
//       min: 6,
//     }),
//     check('login', '[INFO] Minimum length of login is 10!').isLength({
//       min: 10,
//     }),
//     check('role', '[INFO] Choose role!'),
//   ],

//   async (req, res) => {
//     try {
//       const errors = validationResult(req)
//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           message: errors.array()[0].msg,
//           flag: '#D1557A',
//         })
//       }

//       const { email, password, login, role } = req.body
//       const loginCheck = await User.findOne({ login })
//       const emailCheck = await User.findOne({ email })
//       if (emailCheck || loginCheck) {
//         return res
//           .status(400)
//           .json({ message: '[INFO] Person duplicates!', flag: '#EAC15A' })
//       }

//       const nb_of_classes = 0
//       const classes = []
//       const hashedPassword = await bcrypt.hash(password, 12)
//       const user = new User({
//         email,
//         password: hashedPassword,
//         login,
//         role,
//         nb_of_classes,
//         classes,
//       })

//       await user.save()
//       console.log('User Saved')
//       res.status(201).json({ message: '[INFO] User created!', flag: '#66D9BD' })
//     } catch (e) {
//       console.log(e)
//       res.status(500).json({ message: '[INFO] Router post error!' })
//     }
//   },
// )

module.exports = router
