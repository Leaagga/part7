import { useContext, useState } from 'react'
import userContext from '../UserContext'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createUser, logIn } from '../userRequest'
import notificationContext from '../notificationContext'
const LogIn = () => {
  const queryClient = useQueryClient()
  const [visible, setVisible] = useState(false)
  const [user, userDispatch] = useContext(userContext)
  const [notification, notificationDispatch] = useContext(notificationContext)
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
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      notificationDispatch({ type: 'SIGNUP', payload: newUser })
    },
  })
  const logInMutation = useMutation({
    mutationFn: logIn,
    onSuccess: (loggedUser) => {
      console.log(loggedUser)
      userDispatch({ type: 'LOGIN', payload: loggedUser })
      notificationDispatch({ type: 'LOGIN', payload: loggedUser })
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
  const handleLogOut = (event) => {
    event.preventDefault()
    userDispatch({ type: 'LOGOUT' })
    notificationDispatch({ type: 'LOGOUT' })
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
        &nbsp;&nbsp; username
        <input value={username} onChange={handleUsername} />
        &nbsp;&nbsp; password
        <input value={password} onChange={handlePassword} />
        &nbsp;&nbsp;
        <button type='submit'>log in</button>
      </form>
      <form onSubmit={handleSignUp} style={showWhenVisible}>
        Sign up &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => setVisible(false)} type='button'>
          log in
        </button>
        &nbsp;&nbsp; username
        <input value={username} onChange={handleUsername} />
        &nbsp;&nbsp; password
        <input value={password} onChange={handlePassword} />
        name
        <input value={name} onChange={handleName} />
        &nbsp;&nbsp;
        <button type='submit'>sign up</button>
      </form>
    </div>
  ) : (
    <div>
      {user.user.username} logged in.
      <button onClick={handleLogOut}>log out</button>
    </div>
  )
}
export default LogIn
