const nodeValidator = require('node-input-validator'),
      errorHelper    = require('../helpers/errorHelper'),
      { Validator }  = nodeValidator

let REGISTER = async function( req, res, next ) {
    let validate = new Validator(req.body, {
        username: "required|string|minLength:1|maxLength:10000",
        email   : "required|email|minLength:3|maxLength:500",
        password: "required|string|minLength:1|maxLength:1000",
    },{
        'title.required'     : ":attribute is required"
    });
        
    let matched = await validate.check()
    if (!matched) {
        req.errors = validate.errors
        return errorHelper.apiResponseErrorResource( req, res )
    }
    next()
}

let LOGIN = async function( req, res, next ){

    let validate = new Validator(req.body, {
        email   : "required|email|minLength:3|maxLength:500",
        password: "required|string|minLength:1|maxLength:1000",
    },{
        'title.required'     : ":attribute is required"
    });
     
    let matched = await validate.check()
    if (!matched) {
        req.errors = validate.errors
        return errorHelper.apiResponseErrorResource( req, res )
    }
    next()
}

module.exports = {
    REGISTER,
    LOGIN
}
