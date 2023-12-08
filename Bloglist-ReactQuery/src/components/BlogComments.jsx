import { useState } from 'react'
import { commentAdd } from '../blogRequests'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Form, Button, InputGroup, ListGroup } from 'react-bootstrap'

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
      <Form onSubmit={handleAddComments}>
        <InputGroup>
          <Form.Control
            value={addComment}
            onChange={(event) => setAddComments(event.target.value)}
          />
          <Button type='submit'>add comment</Button>
        </InputGroup>
      </Form>
      <ListGroup as='ul'>
        {comments.map((c) => (
          <ListGroup.Item as='li' key={c}>
            {c}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}
export default BlogComments
