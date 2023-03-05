const express = require('express');
const { createProperty, getAllProperties, getProperty, deleteMyProperty, getPropertyByLocation } = require('../controller/propertyController');
const { verifyToken, verifyUser } = require('../utils/verifyToken');

const router = express.Router()

router.route('/').post(verifyToken, createProperty).get(getAllProperties)
router.route('/:id').get(getProperty)
router.route('/location/:location').get(getPropertyByLocation)
router.route('/:id/:propertyId').delete(verifyUser, deleteMyProperty)

module.exports = router