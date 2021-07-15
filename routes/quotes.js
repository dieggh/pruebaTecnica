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

router.get('/quoteCar/:brand/:year/:hasAC', [
    param('brand')
        .notEmpty().withMessage("Brand is Required"),
    param('year')
        .notEmpty().withMessage("Year is Required")            
        .isNumeric().withMessage("Year has to be a number"),
    param('hasAC')
        .notEmpty().withMessage("HasAC is required")
        .isBoolean().withMessage("HasAc must to be boolean")
],
validateRequest,
controllerQuotes.getQuoteCar
);


module.exports = router;