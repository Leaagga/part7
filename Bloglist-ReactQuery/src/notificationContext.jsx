import { createContext, useReducer } from 'react'
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return {
        content: `A new blog ${action.payload.title} by ${action.payload.author} added`,
        type: 'blog',
      }
    case 'LIKES':
      return { content: `You liked ${action.payload.title}`, type: 'blog' }

    case 'DELETE':
      return {
        content: `Blog ${action.payload.title} by ${action.payload.author} removed`,
        type: 'blog',
      }
    case 'LOGIN':
      return { content: `${action.payload.username} logged in`, type: 'user' }

    case 'LOGOUT':
      return { content: `Logged out`, type: 'user' }

    case 'CLEATR':
      return { content: null, type: 'NULL' }

    case 'ERROR':
      return { content: `Error: ${action.payload}`, type: 'error' }
    case 'SIGNUP':
      return {
        content: `created new user ${action.payload.username}`,
        type: 'user',
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
