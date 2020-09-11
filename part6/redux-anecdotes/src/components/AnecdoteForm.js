import React from 'react'
import {connect} from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import {setNotification} from "../reducers/notificationReducer";


const AnecdoteForm = (props) => {

    const addNewAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.text.value
        event.target.text.value = ''
        props.createNewAnecdote(content)
        props.setNotification(`A new anecdote has been created`, 5000)
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

const mapDispatchToProps = {
    createNewAnecdote,
    setNotification
}

const connectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)
export default connectedAnecdoteForm