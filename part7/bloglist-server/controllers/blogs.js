const blogsRouter = require('express').Router()
const { json } = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/api/blogs', async (request, response) => {
  const blog = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blog)
})

blogsRouter.get('/api/blogs/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end
  }
})

blogsRouter.post('/api/blogs', async (request, response, next) => {
  const blog = new Blog(request.body)
  const firstuser = request.user

  try {
    const userid = firstuser._id
    blog.user = userid
  } catch(exception) {
    next(exception)
  }

  if (blog.url && blog.title) {
      const savedblog = await blog.save()
      firstuser.blogs = firstuser.blogs.concat(savedblog._id)
      await firstuser.save()
      response.status(201).json(savedblog)
    } else {
      response.status(400)
    }    

})

blogsRouter.delete('/api/blogs/:id', async (request, response, next) => {
  const token = await request.token
  const decodedToken = await jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  try {
    const blogfound = await Blog.findById(request.params.id)
    if (blogfound.user.toString()===request.user._id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).json({error: 'user token does not match blog owner'})
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/api/blogs/:id', async (request, response, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new:true})
    console.log(updatedBlog)
    response.json(updatedBlog)
  } catch(exception) {
    next(exception)
  }

})

blogsRouter.get('/api/blogs/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.comments)
  } else {
    response.status(404).end
  }
})

blogsRouter.put('/api/blogs/:id/comments', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  const newblog = {title: blog.title, author: blog.author, url: blog.url, user: blog.user, comments: blog.comments.concat(request.body.comments)}
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newblog, {new:true})
    console.log(updatedBlog)
    response.json(updatedBlog)
  } catch(exception) {
    next(exception)
  }

})

module.exports = blogsRouter