import axios from 'axios'
import * as bcrypt from 'bcryptjs'
import * as jose from 'jose'
const baseUrl = 'http://localhost:3001/users'
const getId = () => (100000 * Math.random()).toFixed(0)
const saltRounds = bcrypt.genSaltSync(10)
const SECRET = import.meta.env.VITE_SECRET //not process.env
const secret = new TextEncoder().encode(SECRET)
const setNewUser = async (user) => {
  const users = await axios.get(baseUrl)
  const nameFilter = users.data.findIndex((u) => user.username == u.username)
  if (nameFilter != -1) {
    return 'Invalid username'
  }
  const passwordHash = await bcrypt.hash(user.password, saltRounds)
  const response = await axios.post(baseUrl, {
    username: user.username,
    name: user.name,
    passwordHash: passwordHash,
    id: getId(),
  })
  console.log(response)
  return response.data
}
const logIn = async (user) => {
  const response = await axios.get(baseUrl)
  const users = response.data
  console.log(users)
  const foundUser = users.find((u) => u.username == user.username)
  if (foundUser === undefined) {
    return 'Invalid username'
  }
  console.log(foundUser)
  const checkedHash = foundUser.passwordHash
  console.log(checkedHash)
  const passwordCheck = await bcrypt.compare(user.password, checkedHash)
  //password!! not passsword hash
  console.log(passwordCheck)
  if (!passwordCheck) return 'Invalid password'
  console.log(passwordCheck)
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
const newUser = async () => {}
export default { setNewUser, logIn }
