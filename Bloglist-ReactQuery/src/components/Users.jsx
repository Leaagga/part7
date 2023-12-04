import { useEffect, useState } from 'react'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>&nbsp;&nbsp;&nbsp;&nbsp;</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort((a, b) => {
              return Number(b.likes) - Number(a.likes)
            })
            .map((u) => {
              return (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>{u.blogs.length}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
export default Users
