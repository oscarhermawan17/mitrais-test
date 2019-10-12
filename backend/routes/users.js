const express = require('express')
const router = express.Router()
const api = require('../controllers/user_controller')
const validation = require('../validation/user')

router.post('/registration', validation.user, api.registrationUser);

module.exports = router