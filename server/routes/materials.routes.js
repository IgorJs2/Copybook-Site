const { Router } = require('express')
// const { check, validationResult } = require('express-validator')
// const Materials = require('../models/Materials')
const MaterialController = require('../controllers/material-controller')
const MaterialValidator = require('../validators/material-validator')
const router = Router()

router.post(
  '/create_material',
  MaterialValidator.cr_material,
  MaterialController.cr_material,
)
router.post(
  '/get_materials',
  MaterialValidator.gt_materials,
  MaterialController.gt_materials,
)

// router.post(
//   '/cr_material',
//   [check('name', '[INFO] Incorrect name!').isLength({ min: 4 })],
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

//       const { name, filename, id } = req.body
//       if (!filename) {
//         return res
//           .status(400)
//           .json({ message: '[INFO] Please choose file!', flag: '#EAC15A' })
//       }

//       const name_check = await Materials.findOne({ name })
//       if (name_check) {
//         return res
//           .status(400)
//           .json({ message: '[INFO] Duplicate name', flag: '#EAC15A' })
//       }

//       const date = new Date()

//       const Material = new Materials({
//         name,
//         date: date.toLocaleDateString(),
//         filename,
//         class: id,
//       })

//       await Material.save()

//       return res
//         .status(200)
//         .json({ message: '[INFO] Material send', flag: '#66D9BD' })
//     } catch (error) {}
//   },
// )

// router.post('/gt_materials', async (req, res) => {
//   try {
//     const data = req.body
//     if (data) {
//       const findMaterials = await Materials.find({ class: data.id }).sort({
//         date: -1,
//       })
//       return res.send({ findMaterials })
//     } else {
//       res
//         .status(400)
//         .json({ message: '[INFO] Get materials error!', flag: '#D1557A' })
//     }
//   } catch (e) {
//     res.status(500).json({ message: '[INFO] Data get error!' })
//   }
// })

module.exports = router
