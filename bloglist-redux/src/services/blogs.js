import axios from 'axios'
const baseUrl = 'http://localhost:3001/blogs'
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (blog) => {
  const response = await axios.post(baseUrl, blog)
  return response.data
}
const addLikes = async (blog) => {
  const response = await axios.patch(`${baseUrl}/${blog.id}`, blog)
  console.log(response)
  return response.data
}
const newDelete = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`)
  console.log(response)
  return response
}
export default { getAll, createNew, addLikes, newDelete }
