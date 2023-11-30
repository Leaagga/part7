import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogRedcuer'
import { useState } from 'react'
import { createBlogNo } from '../reducers/notificationReducer'
const BlogForm = () => {
  const [author, setAuthor] = useState()
  const [url, setUrl] = useState()
  const [title, setTitle] = useState()
  const user = useSelector((state) => {
    return state.user
  })
  const handleAuthorChange = ({ target }) => {
    setAuthor(target.value)
  }
  const handleTitleChange = ({ target }) => {
    setTitle(target.value)
  }
  const handleUrlChange = ({ target }) => {
    setUrl(target.value)
  }
  const dispatch = useDispatch()

  const handleBlogCreate = (evnet) => {
    event.preventDefault()
    dispatch(
      createBlog({
        author,
        title,
        url,
        likes: 0,
        user: {
          username: user.user.username,
          name: user.user.name,
          id: user.user.id,
        },
      })
    )
  }
  return (
    <div>
      <form onSubmit={handleBlogCreate}>
        <div>
          title
          <input value={title} onChange={handleTitleChange} />
        </div>
        <div>
          author
          <input value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          url
          <input value={url} onChange={handleUrlChange} />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}
export default BlogForm
