import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { logInNo } from './reducers/notificationReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <Notification />
      <button
        onClick={() => dispatch(setNotification('LOGIN', { username: 'test' }))}
      >
        login
      </button>
    </div>
  )
}

export default App
