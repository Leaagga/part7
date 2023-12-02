import { useContext, useState } from 'react'
import userContext from '../UserContext'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createUser, logIn } from '../userRequest'
const LogIn = () => {
  const queryClient = useQueryClient()
  const [visible, setVisible] = useState(false)
  const [user, userDispatch] = useContext(userContext)
  const [name, setName] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const handleName = (event) => {
    setName(event.target.value)
  }
  const handleUsername = (event) => {
    setUsername(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
  const logInMutation = useMutation({
    mutationFn: logIn,
    onSuccess: (loggedUser) => {
      userDispatch({ type: 'LOGIN', payload: loggedUser })
    },
  })
  const handleSignUp = (event) => {
    event.preventDefault()
    createUserMutation.mutate({ username, password, name })
  }
  const handleLogIn = (event) => {
    event.preventDefault()
    logInMutation.mutate({ password, username })
  }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  return user.user == null ? (
    <div>
      <form onSubmit={handleLogIn} style={hideWhenVisible}>
        Log in &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => setVisible(true)} type='button'>
          sign up
        </button>
        <div>
          username
          <input value={username} onChange={handleUsername} />
        </div>
        <div>
          password
          <input value={password} onChange={handlePassword} />
        </div>
        <button type='submit'>log in</button>
      </form>
      <form onSubmit={handleSignUp} style={showWhenVisible}>
        Sign up &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => setVisible(false)} type='button'>
          log in
        </button>
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
      </form>
    </div>
  ) : (
    <div>
      {user.username} logged in.
      {/* <button onClick={handleLogOut}>log out</button> */}
    </div>
  )
}
export default LogIn
