import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])

 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword}
        handleLogin={() => console.log(`log in`)}></LoginForm>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

const LoginForm = ({username, setUsername, password, setPassword, handleLogin}) => {
  return(
    <div>
      <form onSubmit={handleLogin}>
        username <input value={username} onChange={({ target }) => setUsername(target.value)} /> 
        password <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default App