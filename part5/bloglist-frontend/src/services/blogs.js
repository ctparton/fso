import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const newBlog = async (blog) => {
  const config = {  headers: { Authorization: token },  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const likeBlog = async (blog) => {
  const endpoint = `${baseUrl}/${blog.id}`
  const response = await axios.put(endpoint, blog)
  return response.data
}

const deleteBlog = async (blog) => {
  const config = {  headers: { Authorization: token },  }
  const endpoint = `${baseUrl}/${blog.id}`
  const response = await axios.delete(endpoint, config)
  return response.data
}

export default { getAll, newBlog, likeBlog, deleteBlog, setToken}