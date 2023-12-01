import { useState } from 'react'
import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getBlogs, createBlog } from './requests'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
function App() {
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
  return (
    <div>
      <BlogForm />
      {blogs ? <Blog blogs={blogs} /> : null}
    </div>
  )
}

export default App
