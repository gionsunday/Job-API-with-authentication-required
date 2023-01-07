const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        minlength:3,
        required: [true, 'please provide an name'],
        maxlength: [20, "name must not be greater than 20 characters"]
    },
    email:{
        type: String,
        unique:true,
        trim:true,
        required: [true, 'please provide an email'],
        maxlength: [50, "name must not be greater than 20 characters"]
    },
    password:{
        type: String,
        trim:true,
        minlength:4,
        required: [true, 'please provide an password'],
 },   
    
})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userID:this._id, name:this.name}, process.env.JWT_SECRETE, {expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function(candidatesPassword){
    const isMatch = await bcrypt.compare(candidatesPassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)