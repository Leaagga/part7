import { useContext, useState } from 'react'
import userContext from '../UserContext'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createUser, logIn } from '../userRequest'
import notificationContext from '../notificationContext'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
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
      <Form inline onSubmit={handleLogIn} style={hideWhenVisible}>
        <Row className='align-items-center '>
          <Col xs='auto'>Log in</Col>

          <Col xs='auto'>
            <Button onClick={() => setVisible(true)} type='button' size='sm'>
              sign up
            </Button>
          </Col>
          <Col xs='auto'>
            <InputGroup>
              <InputGroup.Text> username</InputGroup.Text>

              <Form.Control
                className=' mr-sm-2'
                value={username}
                onChange={handleUsername}
              />
            </InputGroup>
          </Col>
          <Col xs='auto'>
            <InputGroup>
              <InputGroup.Text>password</InputGroup.Text>

              <Form.Control
                className=' mr-sm-2'
                value={password}
                onChange={handlePassword}
              />
            </InputGroup>
          </Col>

          <Col xs='auto'>
            <Button type='submit' size='sm'>
              Log in
            </Button>
          </Col>
        </Row>
      </Form>

      <Form onSubmit={handleSignUp} style={showWhenVisible} inline>
        <Row className='align-items-center '>
          <Col xs='auto'>Sign up</Col>
          <Col xs='auto'>
            <Button onClick={() => setVisible(false)} type='button' size='sm'>
              log in
            </Button>
          </Col>
          <Col xs='auto'>
            <InputGroup>
              <InputGroup.Text>username</InputGroup.Text>
              <Form.Control
                className=' mr-sm-2'
                value={username}
                onChange={handleUsername}
              />
            </InputGroup>
          </Col>
          <Col xs='auto'>
            <InputGroup>
              <InputGroup.Text>password</InputGroup.Text>
              <Form.Control
                className=' mr-sm-2'
                value={password}
                onChange={handlePassword}
              />
            </InputGroup>
          </Col>
          <Col xs='auto'>
            <InputGroup>
              <InputGroup.Text>name</InputGroup.Text>
              <Form.Control
                className=' mr-sm-2'
                value={name}
                onChange={handleName}
              />
            </InputGroup>
          </Col>
          <Col xs='auto'>
            <Button type='submit' size='sm'>
              sign up
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  ) : (
    <div>
      <Row className='align-items-center '>
        <Col xs='auto'>{user.user.username} logged in.</Col>
        <Col xs='auto'>
          <Button onClick={handleLogOut}>log out</Button>
        </Col>
      </Row>
    </div>
  )
}
export default LogIn
