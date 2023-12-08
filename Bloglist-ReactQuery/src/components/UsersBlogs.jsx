import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
const UsersBlog = ({ users }) => {
  const { userId } = useParams()
  const user = users.find((u) => {
    return Number(u.id) == Number(userId)
  })
  return user ? (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ListGroup as='ul'>
        {user.blogs.map((b) => (
          <ListGroup.Item as='li' key={b.id}>
            {b.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  ) : null
}
export default UsersBlog
