import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [blogTitle, setBlogTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const loginHandler = async (event) => {
    event.preventDefault()
    const credentials = {
      username,
      password
    }
    try {
      const response = await loginService.login(credentials)
      window.localStorage.setItem('user', JSON.stringify(response))
      setUser(response)
      setUsername('')
      setPassword('')
      notifyUser({text: `${response.name} is now logged in`, success: true})
    } catch (error) {
      notifyUser({text: `Username or password incorrect`, success: false})
    }
  }

  const createBlogHandle = async (event) => {
    event.preventDefault()
    const data =  JSON.parse(window.localStorage.getItem('user'))
    blogService.setToken(data.token)
    try {
      const response = await blogService.newBlog({title: blogTitle, author, url})
      setBlogs(blogs.concat(response))
      notifyUser({text: `New blog created successfully`, success: true})
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
            <LoginForm username={username} password={password}
      setUsername={setUsername} setPassword={setPassword}
      handleLogin={loginHandler}/>
            <p>Please sign in to view blogs</p>
        </div>
          : <div> 
              <UserInfo name={user.name} logoutHandle={setUser}></UserInfo> 
              <CreateBlogForm title={blogTitle} setTitle={setBlogTitle} author={author} setAuthor={setAuthor}
                              url={url} setUrl={setUrl} newBlogHandle={createBlogHandle}>
              </CreateBlogForm>
              <Blogs blogs={blogs}></Blogs>  
            </div>}
    </div>
  )
}

export default App