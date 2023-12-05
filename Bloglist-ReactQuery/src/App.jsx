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
import UsersHome from './components/UsersHome'
import UsersBlog from './components/UsersBlogs'
import { getAllUsers } from './userRequest'
import BlogItem from './components/BlogItem'
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
    return (
      <div>
        {user.user ? (
          <div>
            <BlogForm />
          </div>
        ) : (
          <div></div>
        )}
        <div>{blogs ? <Blog blogs={blogs} /> : null}</div>
      </div>
    )
  }

  return (
    <Router>
      <nav style={{ backgroundColor: 'grey' }}>
        <table>
          <tr>
            <td>
              <Link to='/'>blogs</Link>
            </td>
            <td>
              <Link to='/users'>users</Link>
            </td>
            <td>
              <LogIn />
            </td>
          </tr>
        </table>
      </nav>
      <h2>blogs</h2>
      <div></div>

      <Notification />

      <Routes>
        <Route path='/users' element={<UsersHome users={users} />} />
        <Route path='/users/:userId' element={<UsersBlog users={users} />} />
        <Route path='/' element={<Home user={user} blogs={blogs} />} />
        <Route path='/blogs/:blogId' element={<BlogItem blogs={blogs} />} />
      </Routes>
    </Router>
  )
}

export default App
