import axios from 'axios'

const base_url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(base_url)
    return response.data
}

const newNote = async (anecdote) => {
    const noteToAdd = {
        content: anecdote,
        votes: 0
    }
    const response = await axios.post(base_url, noteToAdd)
    return response.data
}

export default {
    getAll,
    newNote
}