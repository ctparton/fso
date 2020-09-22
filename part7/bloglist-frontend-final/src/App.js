import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Users from "./components/Users";
import blogService from './services/blogs'
import loginService from './services/login'
import {useDispatch, useSelector} from "react-redux";
import {removeNotification, setNotification} from "./reducers/notificationReducer";
import {init} from "./reducers/blogReducer";
import {saveUser} from "./reducers/userReducer";

const App = () => {
    // const [user, setUser] = useState(null)
    const dispatch = useDispatch()
    const blogRef = useRef()
    const blogs = useSelector(state => state.blogs.sort((a,b) => b.likes - a.likes ))
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(init())

    }, [])

    useEffect(() => {
        const userAlreadyLogged = window.localStorage.getItem('user')
        if (userAlreadyLogged) {
            const user = JSON.parse(userAlreadyLogged)
            dispatch(saveUser(user))
            blogService.setToken(user.token)
        }
    }, [])
    const loginHandler = async (credentials) => {
        try {
            const response = await loginService.login(credentials)
            window.localStorage.setItem('user', JSON.stringify(response))
            dispatch(saveUser(response))
            notifyUser({ text: `${response.name} is now logged in`, success: true })
        } catch (error) {
            notifyUser({ text: 'Username or password incorrect', success: false })
        }
    }


    const notifyUser = (message) => {
        dispatch(setNotification(message.text))
        setTimeout(() => dispatch(removeNotification()), 5000)
    }
    return (
        <div>
            <h1>Bloglist: A list of your favourite blogs!</h1>
            {<Notification></Notification>}
            {user === null ?
                <div>
                    <LoginForm handleLogin={loginHandler}/>
                    <p>Please sign in to view blogs</p>
                </div>
                : <div>
                    <UserInfo name={user.name}></UserInfo>
                    <Togglable buttonLabel="New blog" ref={blogRef}>
                        <CreateBlogForm switchVisibility={() => blogRef.current.toggleVisibility()}></CreateBlogForm>
                    </Togglable>

                    <Blogs blogs={blogs}></Blogs>
                    <Users></Users>
                </div>}
        </div>
    )
}

export default App