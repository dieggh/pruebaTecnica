const  expressValidator = require('express-validator');

const validateRequest = (req, res, next) =>{

    const errors = expressValidator.validationResult(req);
    console.log(errors)
    if(errors.isEmpty()){
        next();
    }else{        
        return res.status(400).json({
            status: false,
            errors: errors.array()
        });
    }

}

module.exports = validateRequest;