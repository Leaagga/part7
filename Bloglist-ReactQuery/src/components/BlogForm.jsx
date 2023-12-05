import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useState, useContext } from 'react'
import { createBlog } from '../blogRequests'
import userContext from '../UserContext'
import notificationContext from '../notificationContext'
import { addBlog } from '../userRequest'
const BlogForm = () => {
  const queryClient = useQueryClient()
  const getId = () => (100000 * Math.random()).toFixed(0)
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const [notification, notiDispatch] = useContext(notificationContext)
  const [user, userDispatch] = useContext(userContext)
  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      createBlogUserMutation.mutate({ user: user.user, blog: newBlog })
    },
  })
  const createBlogUserMutation = useMutation({
    mutationFn: addBlog,
    onSuccess: (updatedUser) => {
      userDispatch({ type: 'UPDATE', payload: updatedUser })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
  const [author, setAuthor] = useState()
  const [url, setUrl] = useState()
  const [title, setTitle] = useState()
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  const handleBlogCreate = async (event) => {
    event.preventDefault()
    const content = {
      author,
      url,
      title,
      id: getId(),
      likes: 0,
      user: {
        username: user.user.username,
        name: user.user.name,
        id: user.user.id,
      },
    }
    setAuthor()
    setTitle()
    setUrl()
    newBlogMutation.mutate(content)
    notiDispatch({ type: 'CREATE', payload: content })
  }
  return (
    <div>
      <form onSubmit={handleBlogCreate}>
        <button
          type='button'
          style={hideWhenVisible}
          onClick={() => setVisible(true)}
        >
          create new blog
        </button>
        <div style={showWhenVisible}>
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
          <button type='button' onClick={() => setVisible(false)}>
            close
          </button>
        </div>
      </form>
    </div>
  )
}
export default BlogForm
