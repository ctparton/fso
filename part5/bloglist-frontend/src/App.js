import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from "./components/Togglable"
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import axios from "axios";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const blogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginHandler = async (credentials) => {
    try {
      const response = await loginService.login(credentials)
      window.localStorage.setItem('user', JSON.stringify(response))
      setUser(response)
      notifyUser({text: `${response.name} is now logged in`, success: true})
    } catch (error) {
      notifyUser({text: `Username or password incorrect`, success: false})
    }
  }

  const handleLikes = async (blog) =>  {
    const response = await blogService.likeBlog({...blog, likes: blog.likes + 1})
    setBlogs(blogs.map(b => b.id === blog.id ? {...b, likes: b.likes + 1} : b))
    console.log(response)
  }

  const createBlogHandle = async (newBlog) => {
    const data =  JSON.parse(window.localStorage.getItem('user'))
    blogService.setToken(data.token)
    try {
      const response = await blogService.newBlog(newBlog)
      setBlogs(blogs.concat(response))
      notifyUser({text: `New blog created successfully`, success: true})
      blogRef.current.toggleVisibility()
    } catch (error) {
      notifyUser({text: error.message, success: false})
    }
  }

  const notifyUser = (message) => {
    setNotificationMessage({text: message.text, success: message.success})
    setTimeout(() => setNotificationMessage(null), 5000)
  }
  return (
    <div>
      <h1>Bloglist: A list of your favourite blogs!</h1>
      {<Notification message={notificationMessage}></Notification>}
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

              <Blogs blogs={blogs} likeHandler={handleLikes}></Blogs>
            </div>}
    </div>
  )
}

export default App