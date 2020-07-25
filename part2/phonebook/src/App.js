import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '0404004004', key: 'Arto Hellas'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [searchTerm, setSearchTerm] = useState('')
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const handleNewEntry = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumberEntry = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handlePhonebook = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      key: newName,
      number: newNumber
    }
    persons.map(person => person.name).indexOf(newName) > -1 
    ? alert(`${newName} is already in the phonebook`) 
    : setPersons(persons.concat(newPerson))
  }

  const handleSearch = (event) => { 
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const fetchPersons = () => {
    axios.get("http://localhost:3001/persons")
        .then(response => {
          const data = response.data
          setPersons(data)
        })
    
  }
  useEffect(fetchPersons, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Search searchTerm = {searchTerm} searchContacts={handleSearch}/> 
      <h3>Add new contact</h3>
      <ContactForm newContactHandler={handlePhonebook} name={newName} newNameHandler = {handleNewEntry}
                  number={newNumber} newNumberHandler={handleNewNumberEntry} />
      <h3>Numbers</h3>
      <Contacts contacts={persons} searchTerm = {searchTerm} />
    </div>
  )
}

export default App