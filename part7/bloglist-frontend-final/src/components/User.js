import React from 'react'
import { useParams} from 'react-router-dom'
const User = ({users}) => {
    const id = useParams().id
    console.log(`Id passed as param is ${id}`)
    console.log(users)
    const user = users.find(u => u.id === id)

    if (!user) {
        return null
    }
    return (
        <div>
            <p>Test</p>
            <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>
            <p>Blogs: {user.blogs.length}</p>
            <p>{user.id}</p>
        </div>
    )
}

export default User