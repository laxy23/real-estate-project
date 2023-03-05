const express = require('express')
const router = express.Router()
const { register, login, getMe, updateMe } = require('../controller/authController');
const { verifyToken } = require('../utils/verifyToken');

router.route("/").post(register);
router.route("/login").post(login);
router.route("/:id").get(verifyToken, getMe).put(verifyToken, updateMe)

module.exports = router