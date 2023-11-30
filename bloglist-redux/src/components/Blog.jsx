import { useDispatch, useSelector } from 'react-redux'
import BlogItem from './BlogItem'
import BlogForm from './BlogForm'
import { useEffect } from 'react'
import { initialBlog } from '../reducers/blogRedcuer'
const Blog = () => {
  const dispatch = useDispatch()

  const blogList = useSelector((state) => {
    //return!!!!!!!!!!!!!
    console.log(state)
    return state.blogs
  })
  console.log(blogList)
  return (
    <div className='Blog'>
      Blog
      <BlogForm />
      <div>
        {blogList ? (
          blogList
            .slice() //slice!!!!!
            .sort((a, b) => {
              Number(b.likes) - Number(a.likes) //TypeError?
            })
            .map((blog) => (
              <div key={blog.id}>
                {console.log(blog)}
                <BlogItem blog={blog} key={blog.id} />
              </div>
            ))
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
export default Blog
