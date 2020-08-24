import React, {useState} from 'react'

const LoginForm = ({handleLogin}) => {
    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])

    const loginUser = (event) => {
        event.preventDefault()
        handleLogin({
            username,
            password
        })
        setUsername('')
        setPassword('')
    }
    return(
      <div>
        <form onSubmit={loginUser}>
          username <input value={username} onChange={({ target }) => setUsername(target.value)} /> 
          password <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
          <button>login</button>
        </form>
      </div>
    )
  }

  export default LoginForm