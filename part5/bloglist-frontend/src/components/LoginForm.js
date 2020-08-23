import React from 'react'

const LoginForm = ({username, setUsername, password, setPassword, handleLogin}) => {
    return(
      <div>
        <form onSubmit={handleLogin}>
          username <input value={username} onChange={({ target }) => setUsername(target.value)} /> 
          password <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
          <button>login</button>
        </form>
      </div>
    )
  }

  export default LoginForm