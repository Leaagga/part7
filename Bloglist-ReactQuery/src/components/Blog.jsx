import BlogItem from './BlogItem'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
const Blog = (props) => {
  const blogs = props.blogs
  return (
    <div>
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.author}
              </Link>
              {/* <BlogItem blog={blog} /> */}
            </div>
          ))}
      </div>
    </div>
  )
}
export default Blog
