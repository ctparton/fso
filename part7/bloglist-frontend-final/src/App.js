import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import User from "./components/User";
import CreateBlogForm from './components/CreateBlogForm'
import Blog from "./components/Blog";
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Users from "./components/Users";
import blogService from './services/blogs'
import loginService from './services/login'
import {useDispatch, useSelector} from "react-redux";
import {removeNotification, setNotification} from "./reducers/notificationReducer";
import {init} from "./reducers/blogReducer";
import {saveUser} from "./reducers/userReducer";
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom";
import Menu from "./components/Menu";
import {initUserAccounts} from "./reducers/userAccountsReducer";

const App = () => {
    const dispatch = useDispatch()
    const blogRef = useRef()
    const blogs = useSelector(state => state.blogs.sort((a,b) => b.likes - a.likes ))
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.accounts)
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

    useEffect(() => {
        dispatch(initUserAccounts())
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
        <Router>
            <Menu></Menu>
            <h1>Bloglist: A list of your favourite blogs!</h1>
            {<Notification></Notification>}
            <Switch>
                <Route path="/users/:id">
                    <User users={users}></User>
                </Route>
                <Route  path="/blogs/:id">
                    <Blog blogs={blogs}></Blog>
                </Route>
                <Route path="/users">
                    <Users></Users>
                </Route>
                <Route path="/blogs">
                    {user === null ?
                        <div>
                            <LoginForm handleLogin={loginHandler}/>
                            <p>Please sign in to view blogs</p>
                        </div>
                        : <div>
                            <Blogs blogs={blogs}></Blogs>
                        </div>}
                </Route>
                <Route path="/create">
                    {user === null ?
                        <div>
                            <LoginForm handleLogin={loginHandler}/>
                            <p>Please sign in to create blogs</p>
                        </div>
                        : <div>
                            <Togglable buttonLabel="New blog" ref={blogRef}>
                                <CreateBlogForm switchVisibility={() => blogRef.current.toggleVisibility()}></CreateBlogForm>
                            </Togglable>

                        </div>}
                </Route>
            </Switch>
        </Router>

    )
}

export default App