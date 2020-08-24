import React from 'react'
import Blog from './Blog'
const Blogs = ({blogs, likeHandler}) => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeHandler={likeHandler} />
        )}
      </div>
    )
  }

export default Blogs