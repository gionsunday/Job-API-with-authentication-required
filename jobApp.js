require('dotenv').config()
require('express-async-errors')
const cors = require('cors')

const express= require('express')
const path = require('path')
const app = express()

//middleware
const notFoundMiddleware = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/errorHandler')
const auth =  require('./middleware/auth')
const connectDB = require('./db/dbCon')


//routes
const authRouter =  require('./routes/authRoutes')
const jobsRouter =  require('./routes/jobsRoutes')
const updateRouter =  require('./routes/update')
app.use('/', express.static( path.join(__dirname,'./public')))
app.use(express.json())

app.use('/api/v01/auth', authRouter)
app.use('/api/v01/jobs', auth, jobsRouter)

app.use('/api/v01/job', auth, updateRouter)

//errorhandllers
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 8000
const start = async () =>{
    await connectDB(process.env.CONNECTION_STRING)
    try {
        app.listen(port, console.log(`Server is Live at port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()