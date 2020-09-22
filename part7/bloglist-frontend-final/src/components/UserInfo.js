import React from 'react'
import {useDispatch} from "react-redux";
import {saveUser} from "../reducers/userReducer";

const UserInfo = ({ name }) => {
  console.log(`Current state of ${name}`)
  const dispatch = useDispatch()
  return (
    <div>
      <h2>{name} is logged in</h2>
      <button onClick={()  => {
        window.localStorage.clear()
        dispatch(saveUser(null))

      }}> logout </button>
    </div>
  )
}

export default UserInfo