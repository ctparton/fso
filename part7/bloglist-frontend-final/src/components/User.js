import React from 'react'

const User = ({user}) => {
    return (
        <div>
            <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>
            <p>Blogs: {user.blogs.length}</p>
            <p>{user.id}</p>
        </div>
    )
}

export default User