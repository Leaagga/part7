import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogRedcuer'
import { likeBlogNo } from '../reducers/notificationReducer'
import { deleteBlogNo } from '../reducers/notificationReducer'
const BlogItem = (prop) => {
  const blog = prop.blog
  console.log(blog)
  const dispatch = useDispatch()
  const handleLikes = (event) => {
    dispatch(likeBlog(blog))
  }

  const user = useSelector((state) => {
    return state.user
  })
  const handleDelete = (event) => {
    if (window.confirm(`delete ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
    }
  }
  return (
    <div className='blogItem'>
      <div>
        <div>
          {blog.title} {blog.author}&nbsp;
          {user.user.username == blog.user.username ? (
            <button onClick={handleDelete}>delete</button>
          ) : null}
        </div>
        <div>
          {blog.likes}
          <button onClick={handleLikes}>like</button>
        </div>
        <div>{blog.url}</div>
        <div>{blog.user.username}</div>
      </div>
    </div>
  )
}
export default BlogItem
