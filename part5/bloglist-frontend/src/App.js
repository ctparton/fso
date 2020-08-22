import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])

 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const loginHandler = async (event) => {
    event.preventDefault()
    console.log(`Logging in with ${username} ${password}`)
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
      
    } catch (error) {
      console.log(error.message)
    }
  }

  const createBlogHandle = async (event) => {
    event.preventDefault()
  }
  return (
    <div>
     
      {user === null ?  
          <LoginForm username={username} password={password} 
            setUsername={setUsername} setPassword={setPassword}
            handleLogin={loginHandler}></LoginForm> 
          : <div> 
              <UserInfo name={user.name} logoutHandle={setUser}></UserInfo> 
              <CreateBlogForm newBlogHandle={createBlogHandle}></CreateBlogForm>
              <Blogs blogs={blogs}></Blogs>  
            </div>} 
      
    </div>
  )
}

export default App