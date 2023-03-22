const express = require('express')
const router = express.Router()
const { register, login, getMe, updateMe, getMyProperties } = require('../controller/authController');
const { deleteMyProperty } = require('../controller/propertyController');
const { verifyToken, verifyUser } = require('../utils/verifyToken');

router.route("/").post(register);
router.route("/login").post(login);
router.route("/myProperty/get").get(verifyToken, getMyProperties);
router.route("/:id").get(verifyToken, getMe).put(verifyToken, updateMe)
router.route("/delete/:propertyId").delete(verifyToken, deleteMyProperty)

module.exports = router