const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { unAuthenticatedError} = require('../errors/errorsIndex')

const auth = async (req, res, next) =>{
    const authHeader = req.headers.authorization || req.body.auth
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new unAuthenticatedError('Authentication Error 1 !!')
    }
    const token = authHeader.split(' ')[1]
    console.log(authHeader)
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRETE)
        req.user =  {userID:payload.userID, name:payload.name}
        next()
    } catch (error) {
        throw new unAuthenticatedError('Authentication Error 2 !')
    
    }
}

module.exports = auth