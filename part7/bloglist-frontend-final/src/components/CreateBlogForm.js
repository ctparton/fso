import React, {useRef} from 'react'
import {create} from "../reducers/blogReducer";
import {useDispatch} from "react-redux";

const CreateBlogForm = ({switchVisibility}) => {

    const dispatch = useDispatch()
  const addNewBlog = (event) => {
    event.preventDefault()
      try {
          dispatch(create({
              title: event.target.title.value,
              author: event.target.author.value,
              url: event.target.url.value
          }))
          // notifyUser({ text: 'New blog created successfully', success: true })
          switchVisibility()

      } catch (error) {
          // notifyUser({ text: error.message, success: false })
      }
  }
  return(
    <div className="createFormDiv">
      <form onSubmit={addNewBlog}>
                title <input id="title" name="title"></input>
                author <input id="author" name="author"></input>
                url <input id="url" name="url"></input>
        <button>Create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm