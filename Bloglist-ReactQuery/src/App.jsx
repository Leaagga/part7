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
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
      <Navbar className='bg-body-tertiary '>
        <Container fluid>
          <Nav className='me-auto'>
            <Nav.Link href='/'>blogs</Nav.Link>

            <Nav.Link href='/users'>users</Nav.Link>
          </Nav>
          <LogIn />
        </Container>
      </Navbar>
      <h2>&nbsp;&nbsp;&nbsp;&nbsp;blog app</h2>
      <Container fluid='sm'>
        <Row md='atuo'>
          <Notification />
        </Row>
        <Row md='2'>
          <Routes>
            <Route path='/users' element={<UsersHome users={users} />} />
            <Route
              path='/users/:userId'
              element={<UsersBlog users={users} />}
            />
            <Route path='/' element={<Home user={user} blogs={blogs} />} />
            <Route path='/blogs/:blogId' element={<BlogItem blogs={blogs} />} />
          </Routes>
        </Row>
      </Container>
    </Router>
  )
}

export default App
