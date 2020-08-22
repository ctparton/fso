import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const newBlog = async (blog) => {
  const response = await axios.post(baseUrl, blog)
  return response.data
}

export default { getAll, newBlog }