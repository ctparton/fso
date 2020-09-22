import React, { useState } from 'react'
import {useDispatch} from "react-redux";
import {like, deleteBlog} from "../reducers/blogReducer";

const Blog = ({ blog}) => {
  const [detailVisible, setDetailVisible] = useState(false)
  const dispatch = useDispatch()

  const handleDelete = (blog) => {
      if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
          console.log(`User wishes to delete ${blog.id}`)
          try {
              dispatch(deleteBlog(blog))
              // notifyUser({ text: `${blog.title} deleted successfully`, success: true })
          } catch (error) {
              // notifyUser({ text: error.response.data.error, success: false })
          }
      }
  }
  return (
    detailVisible ?
      <div className="blogComponent">
        <p>{blog.title} by {blog.author}</p>
        <p className="likeText"> likes: {blog.likes} </p> <button className="likeButton" onClick={() => dispatch(like(blog))}>Like</button>
        <p>URL: {blog.url} </p>
        <button onClick={() => (handleDelete(blog))}>Delete</button>
        <button onClick={() => setDetailVisible(!detailVisible)}>Hide</button>

      </div> :
      <div>
        <p>{blog.title} by {blog.author}</p>
        <button className="showButton" onClick={() => setDetailVisible(!detailVisible)}>Show</button>
      </div>
  )
}

export default Blog