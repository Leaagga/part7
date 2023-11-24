import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { logInNo } from './reducers/notificationReducer'
import { setNotification } from './reducers/notificationReducer'
import Blog from './components/Blog'
import { useEffect } from 'react'
import { initialBlog } from './reducers/blogRedcuer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialBlog())
  }, [dispatch])
  return (
    <div>
      <Notification />
      <Blog />
      <button
        onClick={() => dispatch(setNotification('LOGIN', { username: 'test' }))}
      >
        login
      </button>
    </div>
  )
}

export default App
