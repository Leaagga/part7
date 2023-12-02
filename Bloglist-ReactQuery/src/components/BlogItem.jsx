import { deleteBlog, likeBlog } from '../requests'
import notificationContext from '../notificationContext'
import { useState, useContext } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
const BlogItem = ({ blog }) => {
  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(notificationContext)
  const likeBlogMutation = useMutation({
    mutationFn: likeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      dispatch({ type: 'LIKES', payload: blog })
    },
  })
  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      dispatch({ type: 'DELETE', payload: blog })
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
          {/* &nbsp;
          {user.user.username == blog.user.username ? ( */}
          <button onClick={handleDelete}>delete</button>
        </div>
        <div>
          {blog.likes}
          <button onClick={handleLikes}>like</button>
        </div>
        <div>{blog.url}</div>
        {/* <div>{blog.user.username}</div> */}
      </div>
    </div>
  )
}
export default BlogItem
