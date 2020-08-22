import React from 'react'

const UserInfo = ({name, logoutHandle}) => {
    console.log(`Current state of ${name}`)
    return (
      <div> 
        <h2>{name} is logged in</h2>
        <button onClick={()  => {
          window.localStorage.clear()
          logoutHandle(null)
  
          }}> logout </button>
      </div>
    )
  }

export default UserInfo