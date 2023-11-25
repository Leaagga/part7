import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogRedcuer'
import { likeBlogNo } from '../reducers/notificationReducer'
import { deleteBlogNo } from '../reducers/notificationReducer'
const BlogItem = (prop) => {
  const blog = prop.blog
  console.log(blog)
  const dispatch = useDispatch()
  const handleLikes = (event) => {
    dispatch(likeBlog(blog))
    dispatch(likeBlogNo(blog))
  }
  const handleDelete = (event) => {
    if (window.confirm(`delete ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      dispatch(deleteBlogNo(blog))
    }
  }
  return (
    <div className='blogItem'>
      <div>
        <div>
          {blog.title} {blog.author}
        </div>
        <div>
          {blog.likes}
          <button onClick={handleLikes}>like</button>
        </div>
        <div>{blog.url}</div>
        <div>
          <button onClick={handleDelete}>delete</button>
        </div>
      </div>
    </div>
  )
}
export default BlogItem
