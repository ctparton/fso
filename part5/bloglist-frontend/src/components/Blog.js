import React, {useState} from 'react'
const Blog = ({ blog, likeHandler }) => {
    const [detailVisible, setDetailVisible] = useState(false)

    const  body = detailVisible ? <div>{blog.title} {blog.author} {blog.url} {blog.likes}    <button onClick={() => likeHandler(blog)}>like</button><button onClick={() => setDetailVisible(!detailVisible)}>change</button></div> : <div> {blog.title} {blog.author} <button onClick={() => setDetailVisible(!detailVisible)}>change</button> </div>
    return (
        <div>
        {body}



            </div>


    )
}


export default Blog