import { deleteBlog, likeBlog } from '../blogRequests'
import notificationContext from '../notificationContext'
import { useState, useContext } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import userContext from '../UserContext'
import { removeBlog } from '../userRequest'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from 'react-router-dom'
import BlogComments from './BlogComments'
import Button from 'react-bootstrap/Button'
const BlogItem = ({ blogs }) => {
  const { blogId } = useParams()
  const blog = blogs.find((blog) => blog.id == blogId)
  if (!blog) {
    return null
  }
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
  const delteBlogUserMutation = useMutation({
    mutationFn: removeBlog,
    onSuccess: (user) => {
      userDispatch({ type: 'UPDATE', payload: user })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      notiDispatch({ type: 'DELETE', payload: blog })
      delteBlogUserMutation.mutate({ user: user.user, blog: blog })
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
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
          <h2>
            {blog.title} {blog.author}
            &nbsp;{' '}
            {user.user && user.user.username == blog.user.username ? (
              <Button onClick={handleDelete}>delete</Button>
            ) : null}
          </h2>
        </div>
        <div>
          {blog.likes}&nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={handleLikes}>like</Button>
        </div>
        <div>
          <a href={`${blog.url}`}>{blog.url}</a>
        </div>
        <div>add by {blog.user.username}</div>
      </div>
      <BlogComments blog={blog} />
    </div>
  )
}
export default BlogItem
