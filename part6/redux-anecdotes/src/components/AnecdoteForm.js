import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteFrom = () => {
    const dispatch = useDispatch()

    const addNewAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.text.value
        event.target.text.value = ''
       
        dispatch(createNewAnecdote(content))
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