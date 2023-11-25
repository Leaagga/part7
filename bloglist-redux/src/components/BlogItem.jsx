import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogRedcuer'
import { likeBlogNo } from '../reducers/notificationReducer'
const BlogItem = (prop) => {
  const blog = prop.blog
  console.log(blog)
  const dispatch = useDispatch()
  const handleLikes = (event) => {
    dispatch(likeBlog(blog))
    dispatch(likeBlogNo(blog))
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
      </div>
    </div>
  )
}
export default BlogItem
