import React from 'react'

const Notification = ({message}) => {
    if (!message) {
      return null
    }
    const errorStyle = {
      color: "red",
      fontWeight: "bold",
      padding: "10px"
    }
    const successStyle = {
      color: "green",
      fontWeight: "bold",
      padding: "10px"
    }

    return (
      <div id="notificationMessage" style={message.success ? successStyle : errorStyle}>
        {message.text}
      </div>
    )
  }

export default Notification