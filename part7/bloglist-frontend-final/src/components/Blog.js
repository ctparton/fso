import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, likeHandler, deleteHandler }) => {
  const [detailVisible, setDetailVisible] = useState(false)

  return (
    detailVisible ?
      <div className="blogComponent">
        <p>{blog.title} by {blog.author}</p>
        <p className="likeText"> likes: {blog.likes} </p> <button className="likeButton" onClick={() => likeHandler(blog)}>Like</button>
        <p>URL: {blog.url} </p>
        <button onClick={() => deleteHandler(blog)}>Delete</button>
        <button onClick={() => setDetailVisible(!detailVisible)}>Hide</button>

      </div> :
      <div>
        <p>{blog.title} by {blog.author}</p>
        <button className="showButton" onClick={() => setDetailVisible(!detailVisible)}>Show</button>
      </div>
  )
}

Blog.propTypes = {
  likeHandler : PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired
}
export default Blog