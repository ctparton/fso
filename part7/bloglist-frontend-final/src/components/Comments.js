import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {commentBlog} from "../reducers/blogReducer";

const Comments = ({blog}) => {
    const [comment, setComment] = useState("")
    const dispatch = useDispatch()
    const addNewComment = async (event) => {
        event.preventDefault()
        dispatch(commentBlog(blog, comment))
        setComment("")
    }

    return (
        <div>
            <h1>Comments</h1>
            <form  onSubmit={addNewComment}>
                <input name="comment" value={comment} onChange={({target}) => setComment(target.value)}/>
                <button>new comment</button>
            </form>

            <ul>
                {blog.comments.map(c => <li>{c.comment}</li>)}
            </ul>
        </div>
    )
}

export default Comments