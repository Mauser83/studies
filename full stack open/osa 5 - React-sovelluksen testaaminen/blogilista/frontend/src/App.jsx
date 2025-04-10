import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const addBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage({
        text: 'wrong username or password',
        color: 'red',
      })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleLike = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService.update(blog.id, updatedBlog).then((update) => {
      const updatedBlogs = (blogs.map((b) => (b.id !== update.id ? b : update)))
      const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog.id).then(() => {
        const blogsLeft = blogs.filter((b) => b.id !== blog.id)
        setBlogs(blogsLeft)
      })
    }
  }

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((blog) => {
      setBlogs(blogs.concat(blog))
      setNotificationMessage({
        text: `a new blog ${blog.title} by ${blog.author} added`,
        color: 'green',
      })
      addBlogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })
  }

  return (
    <div>
      <h1>Blogs</h1>
      {notificationMessage && (
        <div
          style={{ color: notificationMessage.color }}
          className="Notification"
        >
          {notificationMessage.text}
        </div>
      )}
      {!user && (
        <div>
          <Togglable buttonLabel="log in">
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
        </div>
      )}
      {user && (
        <div>
          <>{user.name} logged in</>
          <button onClick={handleLogout}>Logout</button>
          <Togglable buttonLabel="create blog" ref={addBlogFormRef}>
            <CreateBlog createBlog={addBlog} />
          </Togglable>
        </div>
      )}

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          like={handleLike}
          user={user}
          delet={handleDelete}
        />
      ))}
    </div>
  )
}

export default App
