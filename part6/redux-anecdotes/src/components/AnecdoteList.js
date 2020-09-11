import React from 'react'
import { useDispatch, connect } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import {setNotification} from "../reducers/notificationReducer";


const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes
    const filter = props.filter
    console.log(`Filter is ${filter}`)
  const dispatch = useDispatch()

  const voteAnecdote = (anecdote) => {
      dispatch(voteAction(anecdote))
      dispatch(setNotification(`Voted for note with id ${anecdote.id}`, 5000))
  }

  return (
      <div>
          {anecdotes.sort((a, b) => b.votes - a.votes)
                    .filter(anecdote =>  anecdote.content.toLowerCase().includes(filter.toLowerCase()))
                    .map( anecdote =>
                            <div key={anecdote.id}>
                              <div>
                                {anecdote.content}
                              </div>
                              <div>
                                has {anecdote.votes}
                                <button onClick={() => voteAnecdote(anecdote)}>vote</button>
                              </div>
                            </div>
      )}
      </div>
  )
}

const mapStateToProps = (state) => {
    // sometimes it is useful to console log from mapStateToProps
    console.log(state)
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
        notification: state.notification
    }
}
const connectedAnecdoteList = connect(mapStateToProps)(AnecdoteList)
export default connectedAnecdoteList