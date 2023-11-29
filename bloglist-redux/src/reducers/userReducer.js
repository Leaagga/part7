import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'
import { setNotification } from './notificationReducer'
import { logOutNo } from './notificationReducer'
import { logInNo } from './notificationReducer'
const usersSlice = createSlice({
  name: 'user',
  initialState: { user: null },
  reducers: {
    ininitalUsers: (state, action) => {
      localStorage.setItem('LogInUser', JSON.stringify(action.payload))
      console.log(action.payload)
      return { user: action.payload }
    },
    getUser: (state, action) => {
      const localUser = JSON.parse(localStorage.getItem('LogInUser'))
      return { user: localUser }
    },
    logOut: (state, action) => {
      localStorage.removeItem('LogInUser')
      return { user: null }
    },
  },
})
export const { ininitalUsers, getUser, logOut } = usersSlice.actions
export const createUser = (user) => {
  return async (dispatch) => {
    const response = await usersService.setNewUser(user)
    console.log(response)
    if (response == 'Invalid username') {
      dispatch(
        setNotification({ type: 'ERROR', content: 'Error:Invalid username' })
      )
    } else {
      dispatch(setNotification({ type: 'SIGNUP', content: user }))
    }
  }
}
export const logInUser = (user) => {
  return async (dispatch) => {
    const response = await usersService.logIn(user)
    console.log(response)
    switch (response) {
      case 'Invalid password':
        dispatch(
          setNotification({ type: 'ERROR', content: 'Invalid password' })
        )
        break
      case 'Invalid username':
        dispatch(
          setNotification({ type: 'ERROR', content: 'Invalid username' })
        )
        break
      default:
        dispatch(
          ininitalUsers({
            token: response.token,
            username: response.username,
            name: response.name,
          })
        )
        dispatch(logInNo({ username: response.username }))
    }
  }
}
export const logOutUser = () => {
  return (dispatch) => {
    dispatch(logOut())
    dispatch(logOutNo())
  }
}
export default usersSlice.reducer
