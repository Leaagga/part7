import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getBlogs, createBlog } from './blogRequests'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LogIn from './components/LogIn'
import userContext from './UserContext'
function App() {
  const [user, userDispatch] = useContext(userContext)
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

  return user.user ? (
    <div>
      <Notification />
      <LogIn />
      <BlogForm />
      {blogs ? <Blog blogs={blogs} /> : null}
    </div>
  ) : (
    <div>
      <Notification />
      <LogIn />
    </div>
  )
}

export default App
