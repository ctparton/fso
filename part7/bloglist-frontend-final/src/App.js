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
import {init} from "./reducers/blogReducer";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const blogRef = useRef()
    const dispatch = useDispatch()
    const blogss = useSelector(state => state.blogs.sort((a,b) => b.likes - a.likes ))

    useEffect(() => {
        dispatch(init())
        // setBlogs(blogss)
        // blogService.getAll().then(blogs =>
        //     setBlogs( blogs.sort((a,b) => b.likes - a.likes ))
        // )
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

    const handleLikes = async (blog) =>  {
        const response = await blogService.likeBlog({ ...blog, likes: blog.likes + 1 })
        setBlogs(blogs
            .map(b => b.id === blog.id ? { ...b, likes: b.likes + 1 } : b)
            .sort((a,b) => b.likes - a.likes))
        console.log(response)
    }

    const handleDelete = async (blog)  => {
        console.log(blog)
        if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
            console.log(`User wishes to delete ${blog.id}`)
            try {
                blogService.setToken(JSON.parse(window.localStorage.getItem('user')).token)
                const response = await blogService.deleteBlog(blog)
                console.log(response)
                setBlogs(blogs
                    .filter(b => b.id !== blog.id)
                    .sort((a,b) => b.likes - a.likes))
                notifyUser({ text: `${blog.title} deleted successfully`, success: true })
            } catch (error) {
                notifyUser({ text: error.response.data.error, success: false })
            }

        }
    }

    const createBlogHandle = async (newBlog) => {
        const data =  JSON.parse(window.localStorage.getItem('user'))
        blogService.setToken(data.token)
        try {
            const response = await blogService.newBlog(newBlog)
            setBlogs(blogs.concat(response))
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

                    <Blogs blogs={blogss} likeHandler={handleLikes} deleteHandler={handleDelete}></Blogs>
                </div>}
        </div>
    )
}

export default App