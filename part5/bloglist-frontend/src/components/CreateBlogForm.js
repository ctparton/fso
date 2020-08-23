import React from 'react'

const CreateBlogForm = ({newBlogHandle, title, setTitle, author, setAuthor, url, setUrl}) => {
    return(
        <div>
            <form onSubmit={newBlogHandle}>
                title <input value={title} onChange={({target}) => setTitle(target.value)}></input>
                author <input value={author} onChange={({target}) => setAuthor(target.value)}></input>
                url <input value={url} onChange={({target}) => setUrl(target.value)}></input>
                <button>Create</button>
            </form>
        </div>
    )
}

export default CreateBlogForm