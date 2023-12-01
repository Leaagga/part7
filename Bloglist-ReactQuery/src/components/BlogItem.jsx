const BlogItem = ({ blog }) => {
  return (
    <div className='blogItem'>
      <div>
        <div>
          {blog.title} {blog.author}
          {/* &nbsp;
          {user.user.username == blog.user.username ? (
            <button onClick={handleDelete}>delete</button>
          ) : null} */}
        </div>
        <div>
          {blog.likes}
          {/* <button onClick={handleLikes}>like</button> */}
        </div>
        <div>{blog.url}</div>
        {/* <div>{blog.user.username}</div> */}
      </div>
    </div>
  )
}
export default BlogItem
