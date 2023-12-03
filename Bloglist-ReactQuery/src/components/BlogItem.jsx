import { deleteBlog, likeBlog } from '../blogRequests'
import notificationContext from '../notificationContext'
import { useState, useContext } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import userContext from '../UserContext'
const BlogItem = ({ blog }) => {
  const queryClient = useQueryClient()
  const [user, userDispatch] = useContext(userContext)
  const [notification, notiDispatch] = useContext(notificationContext)
  const likeBlogMutation = useMutation({
    mutationFn: likeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notiDispatch({ type: 'LIKES', payload: blog })
    },
  })
  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notiDispatch({ type: 'DELETE', payload: blog })
    },
  })
  const handleLikes = (event) => {
    event.preventDefault()
    likeBlogMutation.mutate(blog)
  }
  const handleDelete = (event) => {
    event.preventDefault()
    if (window.confirm(`delete ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog)
    }
  }
  return (
    <div className='blogItem'>
      <div>
        <div>
          {blog.title} {blog.author}
          &nbsp;
          {user.user.username == blog.user.user.username ? (
            <button onClick={handleDelete}>delete</button>
          ) : null}
        </div>
        <div>
          {blog.likes}
          <button onClick={handleLikes}>like</button>
        </div>
        <div>{blog.url}</div>
        <div>{blog.user.user.username}</div>
      </div>
    </div>
  )
}
export default BlogItem
