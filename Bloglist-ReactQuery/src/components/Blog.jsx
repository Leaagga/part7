import BlogItem from './BlogItem'
import BlogForm from './BlogForm'
const Blog = (props) => {
  const blogs = props.blogs
  return (
    <div>
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div key={blog.id}>
              <BlogItem blog={blog} />
            </div>
          ))}
      </div>
    </div>
  )
}
export default Blog
