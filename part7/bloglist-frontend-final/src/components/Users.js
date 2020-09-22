import React, {useEffect, useState} from 'react'
import usersService from "../services/users";
import User from './User'
const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        usersService.getAll().then(response => setUsers(response))
    }, [])
    return(
        <div>
            <h1>Users</h1>
            {users.map(user => <User user={user}></User>)}
        </div>
    )
}

export default Users