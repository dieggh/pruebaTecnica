const express = require('express');
const { param } = require('express-validator');
const controllerQuotes = require('../controller/quotes');
const validateRequest = require('../middlewares/validateRequest');
const router = express.Router();

//creamos la ruta para el endpoint bestOptionsPerYear
router.get('/bestOptionsPerYear/:year', [
        param('year')
            .notEmpty().withMessage("Year is Required")            
            .isNumeric().withMessage("Year has to be a number")
    ], 
    validateRequest,
    controllerQuotes.getBestOptionsPerYear
);


module.exports = router;