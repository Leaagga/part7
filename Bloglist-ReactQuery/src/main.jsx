import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import notificationContext from './notificationContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './notificationContext.jsx'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>
)
