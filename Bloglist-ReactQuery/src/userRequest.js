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
  }
}
