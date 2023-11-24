import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogRedcuer from './reducers/blogRedcuer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogRedcuer,
  },
})
export default store
