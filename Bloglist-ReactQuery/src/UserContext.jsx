import { createContext, useReducer } from 'react'
const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGOUT':
      window.localStorage.clear('LoggedInUser')
      return { user: null }
    case 'LOGIN':
      window.localStorage.setItem(
        'LoggedInUser',
        JSON.stringify(action.payload)
      )
      return { user: action.payload }
    case 'GETUSER':
      return { user: JSON.parse(window.localStorage.getItem('LoggedInUser')) }
  }
}
const userContext = createContext()
export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, { user: null })
  return (
    <userContext.Provider value={[user, userDispatch]}>
      {props.children}
    </userContext.Provider>
  )
}
export default userContext
