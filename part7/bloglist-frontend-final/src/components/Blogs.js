import React from 'react'
import Blog from './Blog'
import {Link} from "react-router-dom";
const Blogs = ({ blogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog => <ul>
              <Link to={`/blogs/${blog.id}`}>
                  <li key={blog.id}> {blog.title} </li>
              </Link>
      </ul>

      )}
    </div>
  )
}

export default Blogs