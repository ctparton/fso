import React from 'react'

const CreateBlogForm = ({newBlogHandle}) => {
    return(
        <div>
            <form onSubmit={newBlogHandle}>
                title <input></input>
                author <input></input>
                url <input></input>
                <button onClick='submit'>Create</button>
            </form>
        </div>
    )
}

export default CreateBlogForm