import {Link} from "react-router-dom";
import React from "react";
import UserInfo from "./UserInfo";
import {useSelector} from "react-redux";

const Menu = () => {
    const user = useSelector(state => state.user)
    return(
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/blogs">Blogs</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <Link to="/create">Create</Link>
                </li>
                <li>
                    {user === null ? null : <UserInfo name={user.name}></UserInfo>}
                </li>
            </ul>
        </nav>
    )
}

export default Menu