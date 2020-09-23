import React from 'react'

import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
const Users = () => {
    const users = useSelector(state => state.accounts)

    return(
        <div>
            <h1>Users</h1>
            {users.map(user =>
                <ul>
                    <Link to={`/users/${user.id}`}>
                        <li key={user.id}>{user.name} </li>
                    </Link>
                </ul>)}

        </div>
    )
}

export default Users