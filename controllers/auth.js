const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, unAuthenticatedError } = require('../errors/errorsIndex')

const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name:user.name}, token })
}

const login = async (req, res) => {
   const {email, password} = req.body
   if(!email || !password){
       throw new BadRequestError('Please provide email and password')
   }

   const user =  await User.findOne({email}) 
   if(!user){
       throw new unAuthenticatedError('Not a REGISTERED user register now')
   }
   const isPasswordCorrect = await user.comparePassword(password)
   
   if(!isPasswordCorrect){
    throw new unAuthenticatedError('Wrong password!')
}
   const token = user.createJWT()
   res.status(StatusCodes.OK).json({user:{name:user.name}, token})
}

module.exports ={
    register, login
}