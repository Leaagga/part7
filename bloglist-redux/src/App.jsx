import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { logInNo } from './reducers/notificationReducer'
import LogIn from './components/LogIn'
import { setNotification } from './reducers/notificationReducer'
import Blog from './components/Blog'
import { useEffect } from 'react'
import { initialBlog } from './reducers/blogRedcuer'
import { getUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const localUser = localStorage.getItem('LogInUser')
  useEffect(() => {
    dispatch(initialBlog())
  }, [dispatch])
  if (localUser) {
    dispatch(getUser())
  }
  return (
    <div>
      <Notification />
      {localUser ? (
        <div>
          <LogIn />
          <Blog />
        </div>
      ) : (
        <div>
          <LogIn />
        </div>
      )}
    </div>
  )
}

export default App
