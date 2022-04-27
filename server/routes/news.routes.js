const { Router } = require('express')
// const { check, validationResult } = require('express-validator')
// const User = require('../models/User')
// const Class = require('../models/Class')
// const News = require('../models/News')
const NewsValidator = require('../validators/news-validator')
const NewsController = require('../controllers/news-controller')
const router = Router()

router.post('/create_news', NewsValidator.cr_news, NewsController.cr_news)
router.post('/get_news', NewsValidator.gt_news, NewsController.gt_news)
router.post('/delete_news', NewsValidator.dl_news, NewsController.dl_news)

// router.post(
//   '/cr_news',
//   [
//     check('title', '[INFO] Incorrect email!').isLength({ min: 4 }),
//     check('text', '[INFO] Incorrect password!').isLength({ min: 6, max: 1500 }),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req)

//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           errors: errors.array(),
//           message: '[INFO] Incorrect data in registration!',
//           flag: '#D1557A',
//         })
//       }

//       const { title, text, messageFile, id } = req.body
//       const news_check = await News.findOne({ title })

//       if (news_check) {
//         return res
//           .status(400)
//           .json({ message: '[INFO] Duplicate news!', flag: '#EAC15A' })
//       }

//       const date = new Date()

//       const news = new News({
//         title,
//         text,
//         file: messageFile,
//         class: id,
//         date: date.toLocaleDateString(),
//       })

//       await news.save()

//       res.status(201).json({ message: '[INFO] News created!', flag: '#66D9BD' })
//     } catch (e) {
//       console.log(e)
//       res.status(500).json({ message: '[INFO] Router post error!' })
//     }
//   },
// )

// router.post('/gt_news', async (req, res) => {
//   try {
//     const data = req.body
//     if (data.id.title) {
//       const findNewsByTitle = await News.findOne({ title: data.id.title })
//       return res.send({ findNewsByTitle })
//     } else if (data.id) {
//       const findNews = await News.find({ class: data.id })
//       return res.send({ findNews })
//     } else {
//       res
//         .status(500)
//         .json({ message: '[INFO] News get error!', flag: '#EAC15A' })
//     }
//   } catch (e) {
//     res.status(500).json({ message: '[INFO] Data get error!' })
//   }
// })

// router.post('/dl_news', async (req, res) => {
//   try {
//     const { id, class_, name } = req.body

//     if (!name) {
//       return res
//         .status(400)
//         .json({ message: '[INFO] Not found news!', flag: '#EAC15A' })
//     }

//     try {
//       if (id && class_) {
//         const UserDb = await User.findById(id)
//         const ClassDb = await Class.findById(class_)

//         if (UserDb && ClassDb && UserDb.role === 'Teacher') {
//           const NewsDb = await News.find({ title: name, class: class_ })
//           if (NewsDb && NewsDb[0]) {
//             await News.deleteOne({ title: name, class: class_ })
//             return res
//               .status(201)
//               .json({ message: '[INFO] News deleted!', flag: '#66D9BD' })
//           } else {
//             return res
//               .status(400)
//               .json({ message: '[INFO] News not found!', flag: '#EAC15A' })
//           }
//         } else {
//           return res
//             .status(400)
//             .json({ message: '[INFO] Not correct data!', flag: '#EAC15A' })
//         }
//       } else {
//         return res
//           .status(400)
//           .json({ message: '[INFO] Not found data!', flag: '#EAC15A' })
//       }
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ message: '[INFO] Server error!', flag: '#EAC15A' })
//     }
//   } catch (e) {
//     res.status(500).json({ message: '[INFO] Data get error!' })
//   }
// })

module.exports = router
