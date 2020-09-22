import React, { useState } from 'react'

const CreateBlogForm = ({ newBlogHandle }) => {
  const [blogTitle, setBlogTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])

  const addNewBlog = (event) => {
    event.preventDefault()
    newBlogHandle({ title: blogTitle, author, url })
    setBlogTitle('')
    setAuthor('')
    setUrl('')
  }
  return(
    <div className="createFormDiv">
      <form onSubmit={addNewBlog}>
                title <input id="title" value={blogTitle} onChange={({ target }) => setBlogTitle(target.value)}></input>
                author <input id="author" value={author} onChange={({ target }) => setAuthor(target.value)}></input>
                url <input id="url" value={url} onChange={({ target }) => setUrl(target.value)}></input>
        <button>Create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm