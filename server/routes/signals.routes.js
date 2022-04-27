const { Router } = require('express')
// const { check, validationResult } = require("express-validator");
// const User = require("../models/User");
// const Class = require("../models/Class");
// const Signals = require("../models/Signals");
const SignalController = require('../controllers/signal-controller')
const SignalValidator = require('../validators/signal-validator')
const router = Router()

router.post(
  '/create_signal',
  SignalValidator.cr_signals,
  SignalController.cr_signals,
)
router.post(
  '/get_signals',
  SignalValidator.gt_signals,
  SignalController.gt_signals,
)
router.post(
  '/delete_signal',
  SignalValidator.del_signals,
  SignalController.del_signals,
)

// router.post(
//   '/cr_signals',
//   [
//     check('title', '[INFO] Incorrect title!').isLength({ min: 4 }),
//     check('text', '[INFO] Incorrect text!').isLength({ min: 6, max: 1500 }),
//   ],
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

//       const { name_st, title, text, id } = req.body
//       const signals_check = await Signals.findOne({ title })

//       if (signals_check) {
//         return res
//           .status(400)
//           .json({ message: '[INFO] Duplicate signals!', flag: '#EAC15A' })
//       }

//       const date = new Date()

//       const signals = new Signals({
//         name_st,
//         title,
//         text,
//         class: id,
//         date: date.toLocaleDateString(),
//         answer: '',
//       })

//       await signals.save()

//       res.status(201).json({ message: '[INFO] Signals send!', flag: '#66D9BD' })
//     } catch (e) {
//       console.log(e)
//       res.status(500).json({ message: '[INFO] Router post error!' })
//     }
//   },
// )

// router.post('/gt_signals', async (req, res) => {
//   try {
//     const data = req.body
//     const findSignals = await Signals.find({ class: data.id })
//     if (findSignals[0]) {
//       return res.send({ findSignals })
//     } else {
//       const findSignalsByTitle = await Signals.findOne({ title: data.id })
//       return res.send({ findSignalsByTitle })
//     }
//   } catch (e) {
//     res.status(500).json({ message: '[INFO] Data get error!' })
//   }
// })

// router.post('/del_signals', async (req, res) => {
//   try {
//     const data = req.body
//     const Signal = await Signals.find({ title: data.signal })
//     if (Signal) {
//       await Signals.deleteOne({ title: data.signal })
//       res
//         .status(200)
//         .json({ message: '[INFO] Signals deleted.', flag: '#66D9BD' })
//     }
//   } catch (e) {
//     res.status(500).json({ message: '[INFO] Data get error!' })
//   }
// })

module.exports = router
