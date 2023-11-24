const BlogItem = (prop) => {
  const blog = prop.blog
  console.log(blog)
  return (
    <div className='blogItem'>
      <div>
        <div>
          {blog.title} {blog.author}
        </div>
        <div>{blog.likes}</div>
        <div>{blog.url}</div>
      </div>
    </div>
  )
}
export default BlogItem
