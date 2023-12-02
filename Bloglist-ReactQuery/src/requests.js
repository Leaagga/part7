import axios from 'axios'
const baseUrl = 'http://localhost:3001/blogs'
export const getBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
export const createBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog)
  return response.data
}
export const likeBlog = async (blog) => {
  const response = await axios.patch(`${baseUrl}/${blog.id}`, {
    likes: blog.likes + 1,
  })
  return response.data
}
export const deleteBlog = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`)
  return response.data
}
