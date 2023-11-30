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
      window.localStorage.setItem('LogInUser', JSON.stringify(action.payload))
      console.log(action.payload)
      return { user: action.payload }
    },
    getUser: (state, action) => {
      const localUser = JSON.parse(window.localStorage.getItem('LogInUser'))
      return { user: localUser }
    },
    logOut: (state, action) => {
      window.localStorage.removeItem('LogInUser')
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
      dispatch(setNotification('ERROR', 'Error:Invalid username'))
    } else {
      dispatch(setNotification('SIGNUP', user))
    }
  }
}
export const logInUser = (user) => {
  return async (dispatch) => {
    const response = await usersService.logIn(user)
    console.log(response)
    switch (response) {
      case 'Invalid password':
        dispatch(setNotification('ERROR', 'Invalid password'))
        break
      case 'Invalid username':
        dispatch(setNotification('ERROR', 'Invalid username'))
        break
      default:
        dispatch(
          ininitalUsers({
            token: response.token,
            username: response.username,
            name: response.name,
            id: response.id,
          })
        )
        dispatch(setNotification('LOGIN', { username: response.username }))
    }
  }
}
export const logOutUser = () => {
  return (dispatch) => {
    dispatch(logOut())
    dispatch(setNotification('LOGOUT'))
  }
}
export default usersSlice.reducer
