import React, {useEffect} from 'react'
import {useDispatch} from "react-redux";
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from "./components/Filter";
import anecdoteService from "./services/anecdoteService";
import {initAnecdotes} from "./reducers/anecdoteReducer";

const App = () => {
    const dispatch = useDispatch()
  useEffect(() => {
      console.log(`test`)
      anecdoteService.getAll().then(anecdotes => dispatch(initAnecdotes(anecdotes)))
  })
  return (
    <div>
      <h2>Anecdotes</h2>
        <Filter></Filter>
        <Notification></Notification>
      <AnecdoteList></AnecdoteList>
     <AnecdoteForm></AnecdoteForm>
    </div>
  )
}

export default App