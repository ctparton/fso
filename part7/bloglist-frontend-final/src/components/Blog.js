import React, { useState } from 'react'
import {useDispatch} from "react-redux";
import {like, deleteBlog} from "../reducers/blogReducer";
import { useParams} from 'react-router-dom'
import Comments from "./Comments";

const Blog = ({ blogs}) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  if (!blog) {
      return null
  }


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
      <div className="blogComponent">
        <p>{blog.title} by {blog.author}</p>
        <p className="likeText"> likes: {blog.likes} </p> <button className="likeButton" onClick={() => dispatch(like(blog))}>Like</button>
        <p>URL: {blog.url} </p>
        <button onClick={() => (handleDelete(blog))}>Delete</button>
        <Comments blog={blog}></Comments>

      </div>
  )
}

export default Blog