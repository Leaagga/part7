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
export default { getAll, createNew }
