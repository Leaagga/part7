import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogRedcuer from './reducers/blogRedcuer'
import userReducer from './reducers/userReducer'
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogRedcuer,
    user: userReducer,
  },
})
export default store
