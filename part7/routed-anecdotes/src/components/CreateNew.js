import React, {useState} from "react";
import {useHistory} from 'react-router-dom'
import {useField} from "../hooks";

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const history = useHistory()
    console.log(`content is ${JSON
        .stringify(content.value)}`)
    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        history.push('/')
    }

    const resetForm = () => {
        content.reset()
        author.reset()
        info.reset()
    }
    console.log(`content is ${content}`)

    const removeReset = (obj) => {
        const {reset, ...objNoReset} = obj
        return objNoReset
    }

    console.log(content)
    console.log(removeReset(content))
    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...removeReset(content)}/>
                </div>
                <div>
                    author
                    <input name='author' {...removeReset(author)} />
                </div>
                <div>
                    url for more info
                    <input name='info' {...removeReset(info)} />
                </div>
                <button>create</button>
            </form>
            <button onClick={() => resetForm()}>reset</button>
        </div>
    )
}

export default CreateNew