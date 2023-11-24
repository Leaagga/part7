import { useDispatch, useSelector } from 'react-redux'

const Notification = () => {
  const dispatch = useDispatch()
  const noti = useSelector((state) => state.notification)
  if (noti.type !== 'NULL') {
    const style =
      noti.type === 'error'
        ? {
            border: 'solid',
            padding: 10,
            borderWidth: 1,
            backgroundColor: 'red',
          }
        : {
            border: 'solid',
            padding: 10,
            borderWidth: 1,
          }
    return <div style={style}>{noti.content}</div>
  }
}
export default Notification
