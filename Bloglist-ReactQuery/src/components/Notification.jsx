import { useContext } from 'react'
import notificationContext from '../notificationContext'
import Alert from 'react-bootstrap/Alert'
const Notification = () => {
  const [notification, dispatch] = useContext(notificationContext)
  if (notification.content == null) {
    return null
  }
  const variant = notification.type
  return <Alert variant={variant}>{notification.content}</Alert>
}
export default Notification
