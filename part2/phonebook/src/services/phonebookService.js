import axios from 'axios'

const baseUrl = "/api/persons"
const fetchPersons = () => {
    return axios.get(`${baseUrl}`)
        .then(response => response.data)
  }

const addContact = (contact) => {
    return axios.post(`${baseUrl}`, contact).then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = (id, updatedContact) => {
    return axios.put(`${baseUrl}/${id}`, updatedContact)
}
export default { fetchPersons, addContact, deletePerson, updatePerson}