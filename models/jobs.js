const mongoose = require('mongoose')
 const year = new Date().getFullYear()
 const day = new Date().getDay()
 const month = new Date().getMonth()
  const date = `${day}-${month}-${year}`
const JobSchema = new mongoose.Schema({
    company:{
        type: String,
        trim:true,
        required: [true, 'please provide an company name'],
        maxlength: [20, "name must not be greater than 20 characters"]
    },   
    position:{    
        type: String,  
        trim:true,
        required: [true, 'please provide an company name'],
        maxlength: [20, "name must not be greater than 20 characters"]
    
    },
    status:{
        type: String,
        default:'Pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide user']
    }



}, {timestamps:true})
module.exports = mongoose.model('Job', JobSchema)