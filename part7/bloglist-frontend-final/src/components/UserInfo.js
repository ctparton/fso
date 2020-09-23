import React from 'react'
import {useDispatch} from "react-redux";
import {saveUser} from "../reducers/userReducer";
import {useHistory} from 'react-router-dom'
const UserInfo = ({ name }) => {
  console.log(`Current state of ${name}`)
  const dispatch = useDispatch()
  const history = useHistory()
  return (
    <div>
      <p>{name} is logged in</p>
      <button onClick={()  => {
        window.localStorage.clear()
        dispatch(saveUser(null))
        history.push("/")
      }}> logout </button>
    </div>
  )
}

export default UserInfo