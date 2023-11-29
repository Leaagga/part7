import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, logInUser, logOutUser } from '../reducers/userReducer'
const LogIn = () => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const handleName = (event) => {
    setName(event.target.value)
  }
  const handleUsername = (event) => {
    setUsername(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }
  const user = useSelector((state) => {
    console.log(state)
    return state.user.user
  })
  const handleSignUp = (event) => {
    event.preventDefault()
    dispatch(createUser({ username, password, name }))
  }
  const handleLogIn = (event) => {
    event.preventDefault()
    dispatch(logInUser({ password, username }))
  }
  const handleLogOut = () => {
    dispatch(logOutUser())
  }
  return user == null ? (
    <div>
      <form onSubmit={handleLogIn} style={hideWhenVisible}>
        Log in
        <div>
          username
          <input value={username} onChange={handleUsername} />
        </div>
        <div>
          password
          <input value={password} onChange={handlePassword} />
        </div>
        <button type='submit'>log in</button>
        <button onClick={() => setVisible(true)} type='button'>
          sign up
        </button>
      </form>
      <form onSubmit={handleSignUp} style={showWhenVisible}>
        Sign up
        <div>
          username
          <input value={username} onChange={handleUsername} />
        </div>
        <div>
          password
          <input value={password} onChange={handlePassword} />
        </div>
        <div>
          name
          <input value={name} onChange={handleName} />
        </div>
        <button type='submit'>sign up</button>
        <button onClick={() => setVisible(false)} type='button'>
          log in
        </button>
      </form>
    </div>
  ) : (
    <div>
      {user.username}
      <button onClick={handleLogOut}>log out</button>
    </div>
  )
}
export default LogIn
