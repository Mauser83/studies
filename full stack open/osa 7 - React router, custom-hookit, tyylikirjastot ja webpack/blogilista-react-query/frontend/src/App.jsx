import { useEffect, useRef } from 'react'
import { useUserValue, useUserDispatch } from './reducers/UserContext.jsx'
import blogService from './services/blogs'
import Notification from "./components/Notification.jsx"
import Blogs from "./components/Blogs.jsx"
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'
import { useQuery } from '@tanstack/react-query'

const App = () => {
  const user = useUserValue()
  const userDispatch = useUserDispatch()
  const addBlogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      userDispatch({type: "LOGIN", payload: user})
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    userDispatch({type: "LOGOUT"})
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const blogs = result.data.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {!user && (
        <div>
          <Togglable buttonLabel="log in">
            <LoginForm />
          </Togglable>
        </div>
      )}
      {user && (
        <div>
          <>{user.name} logged in</>
          <button onClick={handleLogout}>Logout</button>
          <Togglable buttonLabel="create blog" ref={addBlogFormRef}>
            <CreateBlog addBlogFormRef={addBlogFormRef} />
          </Togglable>
        </div>
      )}
      <Blogs blogs={blogs}/>
    </div>
  )
}

export default App
