import { createContext, useReducer } from 'react'
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return {
        content: `A new blog ${action.payload.title} by ${action.payload.author} added`,
        type: 'success',
      }
    case 'LIKES':
      return { content: `You liked ${action.payload.title}`, type: 'info' }

    case 'DELETE':
      return {
        content: `Blog ${action.payload.title} by ${action.payload.author} removed`,
        type: 'success',
      }
    case 'LOGIN':
      return {
        content: `${action.payload.username} logged in`,
        type: 'primary',
      }

    case 'LOGOUT':
      return { content: `Logged out`, type: 'primary' }

    case 'CLEATR':
      return { content: null, type: 'primary' }

    case 'ERROR':
      return { content: `Error: ${action.payload}`, type: 'warning' }
    case 'SIGNUP':
      return {
        content: `created new user ${action.payload.username}`,
        type: 'success',
      }
    default:
      return state
  }
}
const notificationContext = createContext()
export const NotificationContextProvider = (props) => {
  const [notificationn, notificationDispatch] = useReducer(
    notificationReducer,
    {
      content: null,
      type: 'NULL',
    }
  )
  if (notificationn.content != null) {
    setTimeout(() => {
      notificationDispatch({ type: 'CLEATR' })
    }, 5000)
  }
  return (
    <notificationContext.Provider value={[notificationn, notificationDispatch]}>
      {props.children}
    </notificationContext.Provider>
  )
}
export default notificationContext
