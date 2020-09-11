
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const voteAction = (id) => {
  return {
    type: 'vote',
    data: { id }
  }
}

export const createNewAnecdote = (content) => {
  return {
    type: 'create',
    data: content
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'initialise',
    data: anecdotes
  }
}


const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'vote':
      console.log(`voted for ${action.data.id}`)
      const test = state.find(anecdote => anecdote.id === action.data.id)
      console.log(test)
      const updatedAnecdote = {...test, votes: test.votes + 1}
      console.log(updatedAnecdote)
      return state.map(anecdote => anecdote.id === action.data.id ? updatedAnecdote : anecdote)
    case 'create':
      return state.concat(action.data)
    case 'initialise':
      return action.data
    default:
      return state
  }
}

export default reducer