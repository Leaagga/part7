import { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getBlogs, createBlog } from './blogRequests'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LogIn from './components/LogIn'
import userContext from './UserContext'
import Users from './components/Users'
import { getAllUsers } from './userRequest'
function App() {
  const [user, userDispatch] = useContext(userContext)
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getUsers = async () => {
      const gotusers = await getAllUsers()
      setUsers(gotusers)
    }
    getUsers()
  }, [user])
  useEffect(() => {
    if (window.localStorage.getItem('LoggedInUser')) {
      userDispatch({ type: 'GETUSER' })
    }
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    retry: 1,
    refetchOnWindowFocus: false,
  })
  console.log(JSON.parse(JSON.stringify(result)))
  if (result.isLoading) {
    return <div>loading data...</div>
  }
  const blogs = result.data
  const Home = ({ user, blogs }) => {
    return user.user ? (
      <div>
        <BlogForm />
        {blogs ? <Blog blogs={blogs} /> : null}
      </div>
    ) : (
      <div></div>
    )
  }
  return (
    <Router>
      <h2>blogs</h2>
      <div>
        <Link to='/users'>users</Link>
        {/* <Link to='/'>home</Link> */}
      </div>

      <Notification />
      <LogIn />
      <Routes>
        <Route path='/users' element={<Users users={users} />} />
        <Route path='/' element={<Home user={user} blogs={blogs} />} />
      </Routes>
    </Router>
  )
}

export default App
