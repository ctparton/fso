import React from 'react'
import {useSelector} from 'react-redux'

const Notification = ({message}) => {
    const notification = useSelector(state => state.notification)
    console.log(notification)
    if (!notification) {
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
      <div>
        {notification}
      </div>
    )
  }

export default Notification