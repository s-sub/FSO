const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

//...

describe('when there is initially one user in db', () => {


  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails without both username and pw', async () => {
    const newUser = {
        username: 'testy',
        name: 'Django'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
  })

  test('creation fails with too many params', async () => {
    const newUser2 = {
        username: 'testy',
        name: 'Django',
        fakeparam: '3131331',
        fakeparam3: '3191904910'
    }

    await api
        .post('/api/users')
        .send(newUser2)
        .expect(400)
  })


  test('creation fails if username/pw too short', async () => {
    const newUser1 = {
        username: 'te',
        name: 'Django',
        password: 'password'
    }

    await api
        .post('/api/users')
        .send(newUser1)
        .expect(400)
  })

})


describe('when multiple users in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
    
        await user.save()
      })
    test('creation fails if username already exists', async () => {
        const newUser3 = {
        username: 'root',
        name: 'Django2',
        password: 'password'
    }

    await api
        .post('/api/users')
        .send(newUser3)
        .expect(400)
    })
    
})

