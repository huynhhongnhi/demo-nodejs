const jwt    = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'jsonwebtoken-secret'

let isAuth = async (req, res, next) => {

    let code     = 401, response = {}
    let access =  req.headers["x-access-token"] || req.headers["authorization"] || req.query.token || req.body.token

    try {
        s
        if (!access) {
            code = 403
            throw new Error('Unauthorized!!!')
        }

        access = access.replace('Bearer ','');
        const user = await jwt.verify( access, secret)    
        req.user = user
        next(); 
    } catch (error) {
        response.code             = code || 401
        response.message          = error.message || 'Unauthorized.'
        response.internal_message = error.message || 'Unauthorized!'    

        return res.status(response.code).json(response)
    }
}


module.exports = {
    isAuth
};