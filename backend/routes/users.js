const express = require('express')
const router = express.Router()
const api = require('../controllers/user_controller')

router.post('/registration', api.registrationUser);

module.exports = router