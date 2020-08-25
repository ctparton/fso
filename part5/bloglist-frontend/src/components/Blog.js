import React, {useState} from 'react'

const Blog = ({ blog, likeHandler, deleteHandler }) => {
    const [detailVisible, setDetailVisible] = useState(false)

    return (
        detailVisible ?
            <div>
                <p>{blog.title} by {blog.author}</p>
                <p>likes: {blog.likes} </p> <button onClick={() => likeHandler(blog)}>like</button>
                <p>URL: {blog.url} </p>
                <button onClick={() => deleteHandler(blog)}>Delete</button>
                <button onClick={() => setDetailVisible(!detailVisible)}>Hide</button>

            </div> :
            <div>
                <p>{blog.title} by {blog.author}</p>
                <button onClick={() => setDetailVisible(!detailVisible)}>Show</button>
            </div>
    )
}

export default Blog