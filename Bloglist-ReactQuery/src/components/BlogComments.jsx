import { useState } from 'react'
import { commentAdd } from '../blogRequests'
import { useQueryClient, useMutation } from '@tanstack/react-query'
const BlogComments = ({ blog }) => {
  const query = useQueryClient()
  const comments = blog.comments
  const [addComment, setAddComments] = useState()
  const addNewComment = useMutation({
    mutationFn: commentAdd,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
  const handleAddComments = (event) => {
    event.preventDefault()
    addNewComment.mutate({ blog: blog, comment: addComment })
  }
  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleAddComments}>
        <input
          value={addComment}
          onChange={(event) => setAddComments(event.target.value)}
        />
        <button>add comment</button>
      </form>
      <ul>
        {comments.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  )
}
export default BlogComments
