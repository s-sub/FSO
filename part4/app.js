// const app = require('./app') // the actual Express application
// const http = require('http')
// const config = require('./utils/config')
// const logger = require('./utils/logger')

// const server = http.createServer(app)

// server.listen(config.PORT, () => {
//   logger.info(`Server running on port ${config.PORT}`)
// })

//Code below is the attempted index//app switch- disregard for now 
// require('dotenv').config()
// const http = require('http')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const loginRouter = require('./controllers/login')

const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/users')
const userExtractor = middleware.userExtractor

const mongoUrl = config.MONGODB_URI
logger.info('connecting to', mongoUrl)
mongoose.connect(mongoUrl)
.then(result => {
    logger.info('connected to MongoDB')
})
.catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)

//below breaks app - to fix...
app.use('/api/blogs', userExtractor)
app.use('/', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app
// const PORT = config.PORT
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })