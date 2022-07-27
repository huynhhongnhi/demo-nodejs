const userService = require("../services/userService");
const authHelper = require("../helpers/authHelper");

const register = async ( req, res ) => {

    let code = 500;
    let response = {};

    try {
        const { username, email, password } = req.body

        const isExist = await userService.getFindUser({ email })
        if( isExist ){
            code = 409
            throw new Error("Email exist!")
        }

        const user = await userService.createUser({ username, email, password });
        response.code             = 200
        response.data             = user.toResources()
        response.message          = "Resgister user success"
        response.internal_message = `Resgister user success with email is ${email}`

        return res.status(response.code).json(response)

    } catch (error) {
        let err                       = { error: 'error', message: error.message }
            response.code             = code || 500
            response.message          = error.message
            response.internal_message = error.message
            response.errors           = [ err ]

        return res.status(response.code).json(response)
    }
}

const login = async ( req, res ) => {

    let code = 500, response = {}

    try {
        const { email, password } = req.body
        const user = await userService.getFindUser({ email })
       
        if( !user ) {
            code = 409
            throw new Error("Email or password incorrect!")
        }

        const isMatch = await user.comparePassword(password)
        if( !isMatch ){
            code = 401 
            throw new Error("Email or password incorrect!")
        }

        const strJWT = await authHelper.hashTokenAccess(user.toResources())

        response.code             = 200
        response.data             = { "token": strJWT }
        response.message          = "User login success"
        response.internal_message = `Login success with email là ${email}`

        return res.status(response.code).json(response)

    } catch (error) {
        let err                       = { error: 'error', message: error.message }
            response.code             = code || 500
            response.message          = error.message
            response.internal_message = error.message
            response.errors           = [ err ]

        return res.status(response.code).json(response)
    }
}

const getUser = async ( req, res ) => {
    let response = {},
        code = 500
    try {
        const { user } = req
        /// response 
        response.code             = 200
        response.data             = user
        response.message          = "buộc phải login nè"
        response.internal_message = "buộc phải login nè"
        return res.status(response.code).json(response)

    } catch (error) {

        let err                       = { error: 'error', message: error.message }
            response.code             = code || 500
            response.message          = error.message
            response.internal_message = error.message
            response.errors           = [err]
        return res.status(response.code).json(response)
    }
}

module.exports = {
    register,
    login,
    getUser
};