const  {BadRequestError}  = require("../errors/errorsIndex")
require('dotenv').config()
const notFoundMiddlewareError =  require('../middleware/notfound')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const Job = require('../models/jobs')

const getAllJobs = async (req, res) => {
   const jobs = await Job.find({createdBy:req.user.userID}).sort('createdAt')
   res.status(StatusCodes.OK).json({jobs, count: jobs.length})
}

const getJob = async (req, res) => {
   const {user:{userID}, params:{id:jobID}} = req
   const job = await Job.findOne({_id:jobID, createdBy:userID})
   if(!job){
      throw new notFoundMiddlewareError(`No Job with id ${jobID}`)
   }
    res.status(StatusCodes.OK).json({job})
 }

 
 const createJobs = async (req, res) => {
   req.body.createdBy = req.user.userID
   const {company, position, status, createdBy} = req.body
   const job = await Job.create({company:company,position:position, status:status, createdBy:createdBy})
   res.status(StatusCodes.CREATED).json({ job })
 }

 const updateJobs = async (req, res) => {
   const {
      user:{userID},
      params:{id:jobID},
      body:{company, position, status},
   } = req
    const job = await Job.findByIdAndUpdate(
       {
       _id:jobID,
    }, 
    req.body,
    { new:true, runValidators:true})
    if(!job){
      throw new notFoundMiddlewareError(`No Job with id ${jobID}`)
   
    }
    res.status(201).json({job})
 }

 const deleteJob = async (req, res) => {
   const {
      user:{userID},
      params:{id:jobID}
      
   } = req
   const job = await Job.findByIdAndRemove(
      {
      _id:jobID, createdBy:userID
   })
   if(!job){
      throw new notFoundMiddlewareError(`No Job with id ${jobID}`)
   
    }
    res.status(201).send()
 }
 
 
 module.exports = {
     getAllJobs,
     getJob,
     createJobs,
     updateJobs,
     deleteJob

 }
