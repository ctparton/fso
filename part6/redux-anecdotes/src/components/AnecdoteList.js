import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import {setNotification} from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
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

export default AnecdoteList