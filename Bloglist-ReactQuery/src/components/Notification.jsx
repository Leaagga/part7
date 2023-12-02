import { useContext } from 'react'
import notificationContext from '../notificationContext'
const Notification = () => {
  const [notification, dispatch] = useContext(notificationContext)
  if (notification.content == null) {
    return null
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return <div style={style}>{notification.content}</div>
}
export default Notification
