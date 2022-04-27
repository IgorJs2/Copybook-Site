const { Router } = require('express')
const express = require('express')

const router = Router()

router.use('/auth/', require('../routes/auth.routes'))

router.use('/class/', require('../routes/class.routes'))

router.use('/class/', require('../routes/news.routes'))
router.use('/class/', require('../routes/signals.routes'))
router.use('/class/', require('../routes/answers.routes'))
router.use('/class/', require('../routes/materials.routes'))
router.use('/class/', require('../routes/homeworks.routes'))
router.use('/class/', require('../routes/grades.routes'))
router.use('/class/', require('../routes/students.routes'))
router.use('/class/', require('../routes/status.routes'))

router.use('/user/', require('../routes/user.routes'))
router.use('/count/', require('../routes/attendance_counter.routes'))

router.use('/file/', require('../routes/files.routes'))

router.use('/uploads', express.static('../uploads'))

module.exports = router
