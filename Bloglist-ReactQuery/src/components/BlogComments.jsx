const BlogComments = ({ blog }) => {
  const comments = blog.comments
  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  )
}
export default BlogComments
