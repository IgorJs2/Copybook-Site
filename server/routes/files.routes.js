// const fs = require('fs')
const { Router } = require('express')
const router = Router()
const FileController = require('../controllers/file-controller')
// const News = require('../models/News')
// const Materials = require('../models/Materials')
// const Files = require('../models/Files')
// const Homeworks = require('../models/Homeworks')
const upload = require('../middleware/file.middleware')
// var contentDisposition = require('content-disposition')

router.post('/upload', upload.single('file'), FileController.upload)
router.delete('/delete/:filename', FileController.delete)
router.get('/download/:filename', FileController.download)
router.delete('/clear', FileController.clear)

// router.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     const data = req.file
//     if (data) {
//       const file = new Files({
//         originalname: data.originalname,
//         mimetype: data.mimetype,
//         destination: data.destination,
//         filename: data.filename,
//         path: data.path,
//         size: data.size,
//       })

//       await file.save()

//       res.send(data.filename)
//     }
//   } catch (e) {
//     res.status(400).json({ message: '[INFO] Error file!' })
//     console.log(18)
//     console.log(e)
//   }
// })

// router.delete('/delete/:filename', async (req, res) => {
//   try {
//     const file = await Files.findOne({ filename: req.params.filename })

//     if (file) {
//       fs.unlink(file.path, () => {})
//       await Files.deleteOne({ filename: req.params.filename })
//     } else {
//       res.status(400).json({ message: '[INFO] File not finded.' })
//     }
//     res.status(200).json({ message: '[INFO] File succesfully removed.' })
//   } catch (error) {
//     console.log(error)
//     res.send('[INFO] An error occured.')
//   }
// })

// router.get('/download/:filename', async (req, res) => {
//   const file = await Files.findOne({ filename: req.params.filename })

//   if (file) {
//     let mimeType = file.contentType
//     if (!mimeType) {
//       mimeType = file.mimetype
//     }

//     res.set({
//       'Content-Type': mimeType,
//       'Content-Disposition': contentDisposition(file.path),
//     })

//     const readStream = fs.createReadStream(file.path)
//     readStream.pipe(res)
//   }
// })

// router.delete('/clear', async (req, res) => {
//   try {
//     let counterNews = 0
//     let counterMaterials = 0
//     let counterHomeworks = 0
//     const News_list = await News.find({})
//     const Materials_list = await Materials.find({})
//     const Homeworks_list = await Homeworks.find({})
//     const Files_list = await Files.find({})
//     Files_list.map((err, i, files) => {
//       if (!files || files.length === 0) {
//         console.log('Not file')
//       } else {
//         files.map(async (file) => {
//           if (file.filename) {
//             News_list.map((news) => {
//               if (news.file != file.filename) {
//                 counterNews++
//               }
//             })
//             Materials_list.map((materials) => {
//               if (materials.filename != file.filename) {
//                 counterMaterials++
//               }
//             })
//             Homeworks_list.map((homeworks) => {
//               if (homeworks.filename != file.filename) {
//                 counterHomeworks++
//               }
//             })
//           }
//           if (
//             News_list.length === counterNews &&
//             Materials_list.length === counterMaterials &&
//             Homeworks_list.length === counterHomeworks
//           ) {
//             counterHomeworks = 0
//             counterNews = 0
//             counterMaterials = 0
//             const file_find = await Files.findOne({
//               filename: file.filename,
//             })
//             if (file_find) {
//               fs.unlink(file_find.path, () => {})
//             } else {
//               console.log('Not find file!')
//             }
//             await Files.deleteOne({ filename: file.filename })
//           } else {
//             counterNews = 0
//             counterMaterials = 0
//             counterHomeworks = 0
//           }
//         })
//       }
//     })
//     res.send('[INFO] Files succesfully cleared.')
//   } catch (error) {
//     console.log(error)
//     res.send('[INFO] An error occured.')
//   }
// })

module.exports = router
