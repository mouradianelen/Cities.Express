const express = require('express');
const asyncHandler = require('express-async-handler');

const citiesService = require('./cities.service');

const route = express.Router();

route.get('/:zipCode/', asyncHandler(async (req, res, next) => {
    const zipCode = req.params['zipCode'];
    const result = await citiesService.getCityData(zipCode);
    res.send(result);
}))

module.exports = route;