const mongoose = require('mongoose')
const config = require('../utils/config')

const url = config.MONGODB_URI

mongoose.connect(url)
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [{
      type: String
    }]
})
  
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
  
module.exports = mongoose.model('Blog', blogSchema)


