import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import {useDispatch, useSelector} from "react-redux";
import {removeNotification, setNotification} from "./reducers/notificationReducer";
import {init, create} from "./reducers/blogReducer";

const App = () => {
    const [user, setUser] = useState(null)
    const blogRef = useRef()
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs.sort((a,b) => b.likes - a.likes ))

    useEffect(() => {
        dispatch(init())

    }, [])

    useEffect(() => {
        const userAlreadyLogged = window.localStorage.getItem('user')
        if (userAlreadyLogged) {
            const user = JSON.parse(userAlreadyLogged)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])
    const loginHandler = async (credentials) => {
        try {
            const response = await loginService.login(credentials)
            window.localStorage.setItem('user', JSON.stringify(response))
            setUser(response)
            notifyUser({ text: `${response.name} is now logged in`, success: true })
        } catch (error) {
            notifyUser({ text: 'Username or password incorrect', success: false })
        }
    }

    const createBlogHandle = async (newBlog) => {
        try {
            dispatch(create(newBlog))
            notifyUser({ text: 'New blog created successfully', success: true })
            blogRef.current.toggleVisibility()
        } catch (error) {
            notifyUser({ text: error.message, success: false })
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
                    <UserInfo name={user.name} logoutHandle={setUser}></UserInfo>
                    <Togglable buttonLabel="New blog" ref={blogRef}>
                        <CreateBlogForm newBlogHandle={createBlogHandle}></CreateBlogForm>
                    </Togglable>

                    <Blogs blogs={blogs}></Blogs>
                </div>}
        </div>
    )
}

export default App