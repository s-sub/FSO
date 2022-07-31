const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Note2',
        author: 'A2',
        url: 'String2',
        likes: 5
    },
    {
        title: 'Note1',
        author: 'A1',
        url: 'String1',
        likes: 5
    },
  ]

const addBlog1 = {
    title: 'Note3',
    author: 'A3',
    url: 'String3',
}

const addBlog2 = {
  author: 'A3',
  likes: 3
}

const addBlog3 = {
  title: 'Note3',
  author: 'A3',
  url: 'String3',
  likes: 1
}

const addBlog4 = {
  title: 'Note3',
  author: 'A3',
  url: 'String3',
  likes: 5
}

const addBlog5 = {
  title: 'Note5',
  author: 'A1',
  url: 'String1',
}

let headers

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    const login = await api.post('/api/login').send(
      {
        username: 'root',
        password: 'sekret'
      }
    )
    token = login.body.token
    headers = {
      'Authorization': `bearer ${token}`
    }
})

describe('testing blogs formatting & basics', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set(headers)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then((res) => {
          expect(res.body.length).toBe(2)
      })
  })

  test('uid is named \"id\"', async () => {
    await api
      .get('/api/blogs')
      .set(headers)
      .then((res) => {
        expect(res.body.forEach(() => 
            (element) => element.id.toBeDefined()
          ))
      })
  })

})

describe('deleting blogs from database', () => {
  test('post successfully deletes 1 blog from database', async () => {
    const resp = await api.post('/api/blogs').set(headers).send(addBlog1)
    addid = resp._body.id
    const response = await api.delete(`/api/blogs/${addid}`).set(headers).expect(204)
    const response2 = await api.get('/api/blogs').set(headers)
    expect(response2.body).toHaveLength(initialBlogs.length)
  })
})


describe('adding blogs to datbase', () => {
  test('post successfully adds 1 blog to the database', async () => {
    await api.post('/api/blogs').set(headers).send(addBlog1)
    const response = await api.get('/api/blogs').set(headers)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
  })

  test('missing like defaults to zero', async () => {
    const resp = await api.post('/api/blogs').set(headers).send(addBlog1)
    addid = resp._body.id
    const response = await api.get(`/api/blogs/${addid}`).set(headers)
    expect(response.body.likes).toBe(0)
  })

  test('missing title or url results in 400 bad req', () => {
    api.post('/api/blogs').set(headers).send(addBlog2).expect(400)
  })

  test('new blogs have a user assigned', async () => {
    const resp = await api.post('/api/blogs').set(headers).send(addBlog5)
    addid = resp._body.id
    const response = await api.get(`/api/blogs/${addid}`).set(headers)
    expect(response.body.user).toBeDefined()
  })
})

describe('updating blog', () => {
  test('post successfully updates blog', async () => {
    const resp = await api.post('/api/blogs').set(headers).send(addBlog3)
    addid = resp._body.id
    await api.put(`/api/blogs/${addid}`).set(headers).send(addBlog4)
    const response = await api.get(`/api/blogs/${addid}`).set(headers)
    expect(response.body.likes).toBe(5)
  })
})

afterAll(() => {
  mongoose.connection.close()
})