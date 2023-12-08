import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from 'react-router-dom'
import { Table, Form, Button, ListGroup } from 'react-bootstrap'
const UsersHome = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort((a, b) => {
              return Number(b.blogs.length) - Number(a.blogs.length)
            })
            .map((u) => {
              return (
                <tr key={u.id}>
                  <td>
                    <Link to={`/users/${u.id}`}>{u.username}</Link>
                  </td>
                  <td>{u.blogs.length}</td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </div>
  )
}

export default UsersHome
