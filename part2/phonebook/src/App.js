import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import phonebookService from './services/phonebookService'


const App = () => {
  const [ persons, setPersons ] = useState([]) 

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
    const existingPerson = persons.map(person => person.name).indexOf(newName)
    if (existingPerson > -1 ) {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one`)) {
        phonebookService.updatePerson(persons[existingPerson].id, {...persons[existingPerson], number: newNumber}).then(response => console.log(response))
        setPersons(persons.map(person => person.id !== persons[existingPerson].id ? person : {...persons[existingPerson], number: newNumber}))
      } 
    } else {
      setPersons(persons.concat(newPerson)) 
      phonebookService.addContact(newPerson).then(response => console.log(response))
    }
    

  }

  const handleSearch = (event) => { 
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const fetchPersons = () => {
    phonebookService.fetchPersons().then(response => setPersons(response))}
    
  useEffect(fetchPersons, []) 

  const handleDelete = (contact) =>  {
    console.log(`User wishes to delete ${contact}`)
    phonebookService.deletePerson(contact).then(response => console.log(response))
    setPersons(persons.filter(person => person.id !== contact))
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Search searchTerm = {searchTerm} searchContacts={handleSearch}/> 
      <h3>Add new contact</h3>
      <ContactForm newContactHandler={handlePhonebook} name={newName} newNameHandler = {handleNewEntry}
                  number={newNumber} newNumberHandler={handleNewNumberEntry} />
      <h3>Numbers</h3>
      <Contacts contacts={persons} searchTerm = {searchTerm} handleDelete={handleDelete}/>
    </div>
  )
}

export default App