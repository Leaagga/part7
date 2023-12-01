import axios from 'axios'
const baseUrl = 'http://localhost:3001/blogs'
export const getBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
export const createBlog = (newBlog) => {
  axios.post(baseUrl, newBlog).then((res) => res.data)
}
