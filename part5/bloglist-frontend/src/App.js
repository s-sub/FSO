import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogView from './components/BlogView'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [updateMsg, setUpdatemsg] = useState('')

  const blogFormRef = useRef()
  const blogShowRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => 
        b.likes - a.likes
      ))
    )}  
  }, [user, blogs])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogsappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setUpdatemsg(`Wrong credentials`)
      setTimeout(() => {
        setUpdatemsg(null)
      }, 100000)
    }
  }

  const handleLogout = async (event) => {
    // event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogsappUser')
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Some strange error - logging out a user that doesnt exist')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = ({title, author, url}) => {
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setUpdatemsg(`New blog "${blogObject.title}" by ${blogObject.author} added`)
        setTimeout(() => {
          setUpdatemsg(null)
        }, 5000)
      })
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='notif' style={addstyle}>
        {message}
      </div>
    )
  }

 const addstyle = {
  color: 'red',
  padding_top: '5px',
  padding_bottom: '5px',
  border: '3px',
  borderColor: 'orange',
  fontStyle: 'italic',
  fontSize: 16
 } 
  const loginForm = () => (
    <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
  )

  const logout = () => (
    <div>
      <span>{`${user.name} logged in`}</span>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  )
  
  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  const blogShow = () => {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      blogs.map(blog =>
        <div style={blogStyle}>
          {/* <span>{console.log(blog)}</span> */}
          <Blog key={blog.id} blog={blog} className='blog'/>
          <Togglable buttonLabel="view" ref={blogShowRef}>
            <BlogView blog ={blog}></BlogView>
          </Togglable>
        </div>
      )
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={updateMsg}/>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      {logout()}
      <Notification message={updateMsg}/>
      <h2>blogs</h2>
      {blogForm()}
      {blogShow()}
    </div>
  )

}

export default App
