import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from "../reducers/notificationReducer";


const AnecdoteFrom = () => {
    const dispatch = useDispatch()

    const addNewAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.text.value
        event.target.text.value = ''
       
        dispatch(createNewAnecdote(content))
        dispatch(setNotification(`A new anecdote has been created`))
        setTimeout(() => dispatch(removeNotification()), 5000)
      }

      
    return (
        <div>
            <h2>create new</h2>
                <form onSubmit={addNewAnecdote}>
        <div><input name="text"/></div>
        <button>create</button>
      </form>
        </div>
    )
}

export default AnecdoteFrom