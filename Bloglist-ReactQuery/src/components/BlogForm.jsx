import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useState, useContext } from 'react'
import { createBlog } from '../blogRequests'

import notificationContext from '../notificationContext'
const BlogForm = () => {
  const queryClient = useQueryClient()
  const getId = () => (100000 * Math.random()).toFixed(0)
  const [notification, notiDispatch] = useContext(notificationContext)
  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
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
    const content = { author, url, title, id: getId(), likes: 0, user: 'test' }
    setAuthor()
    setTitle()
    setUrl()
    newBlogMutation.mutate(content)
    notiDispatch({ type: 'CREATE', payload: content })
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
