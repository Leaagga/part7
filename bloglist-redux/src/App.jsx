import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { logInNo } from './reducers/notificationReducer'
import LogIn from './components/LogIn'
import { setNotification } from './reducers/notificationReducer'
import Blog from './components/Blog'
import { useEffect } from 'react'
import { initialBlog } from './reducers/blogRedcuer'
import { getUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const localUser = window.localStorage.getItem('LogInUser')
    if (localUser) {
      dispatch(getUser())
    }
  }, [])
  const user = useSelector((state) => {
    return state.user
  })
  useEffect(() => {
    dispatch(initialBlog())
  }, [dispatch])
  return (
    <div>
      <Notification />
      <LogIn />
      {user.user ? (
        <div>
          <Blog />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default App
