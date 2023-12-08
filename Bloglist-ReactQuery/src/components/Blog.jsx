import BlogItem from './BlogItem'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Nav from 'react-bootstrap/Nav'
const Blog = (props) => {
  const blogs = props.blogs
  return (
    <div>
      <Table hover bordered>
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <Nav.Link href={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Nav.Link>
                {/* <BlogItem blog={blog} /> */}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}
export default Blog
