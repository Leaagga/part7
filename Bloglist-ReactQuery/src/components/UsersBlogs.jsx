import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from 'react-router-dom'
const UsersBlog = ({ users }) => {
  const { userId } = useParams()
  const user = users.find((u) => {
    return Number(u.id) == Number(userId)
  })
  return user ? (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  ) : null
}
export default UsersBlog
