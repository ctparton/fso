import axios from 'axios'
const baseUrl = '/api/comments'

const newComment = async (comment) => {
    const response = await axios.post(baseUrl, comment)
    return response.data
}

export default {
    newComment
}