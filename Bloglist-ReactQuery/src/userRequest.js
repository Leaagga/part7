import axios from 'axios'
import * as bcrypt from 'bcryptjs'
import * as jose from 'jose'
const saltRounds = bcrypt.genSaltSync(10)
const baseUrl = 'http://localhost:3001/users'
const getId = () => (100000 * Math.random()).toFixed(0)
const SECRET = import.meta.env.VITE_SECRET
const secret = new TextEncoder().encode(SECRET)
export const createUser = async (user) => {
  const users = await axios.get(baseUrl)
  const nameFilter = users.data.findIndex((u) => user.username == u.username)
  if (nameFilter != -1) {
    return 'Invalid username'
  }
  const passwordHash = await bcrypt.hash(user.password, saltRounds)
  const newUser = {
    id: getId(),
    name: user.name,
    username: user.username,
    passwordHash: passwordHash,
    blogs: [],
  }
  const response = await axios.post(baseUrl, newUser)

  return response.data
}
export const logIn = async (user) => {
  const response = await axios.get(baseUrl)
  const users = response.data
  console.log(1)
  const foundUser = users.find((u) => u.username == user.username)
  console.log(1)
  if (!foundUser) return null
  console.log(1)
  const userTest = await bcrypt.compare(user.password, foundUser.passwordHash)
  console.log(1)
  if (!userTest) return null
  console.log(1)
  const token = await new jose.SignJWT({
    password: user.password,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .sign(secret)
  console.log(token)
  return {
    token,
    username: foundUser.username,
    name: foundUser.name,
    id: foundUser.id,
    blogs: foundUser.blogs,
  }
}
export const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  const users = response.data
  return users
}
export const addBlog = async ({ user, blog }) => {
  console.log(user)
  console.log(blog)
  const blogsList = user.blogs
  const addedBlog = blogsList.concat({
    id: blog.id,
    title: blog.title,
    author: blog.author,
  })
  console.log(addedBlog)
  const response = await axios.patch(`${baseUrl}/${user.id}`, {
    blogs: addedBlog,
  })
  return response.data
}

export const removeBlog = async ({ user, blog }) => {
  const blogsList = user.blogs
  console.log(blogsList)
  console.log(blog)
  console.log(user)
  const removedBlogUser = blogsList.filter((b) => b.id != blog.id)
  console.log(removedBlogUser)
  const response = await axios.patch(`${baseUrl}/${user.id}`, {
    blogs: removedBlogUser,
  })
  console.log(response.data)
  return response.data
}
export const getComments = async (blog) => {
  const id = blog.id
  const response = await axios.get(`${baseUrl}/${id}/comments`)
}
