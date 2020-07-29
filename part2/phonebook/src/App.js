import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import phonebookService from './services/phonebookService'
import Notification from './components/Notificaton'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [searchTerm, setSearchTerm] = useState('')
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificatonMessage] = useState(null)


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
        phonebookService.updatePerson(persons[existingPerson].id, {...persons[existingPerson], number: newNumber})
            .then(response => {
              console.log(response)
              setPersons(persons.map(person => person.id !== persons[existingPerson].id ? person : {...persons[existingPerson], number: newNumber}))
              setNotificatonMessage({text: `Updated ${newName}`,  success: true})
              setTimeout(() => setNotificatonMessage(null), 5000) 
            })
            .catch(error => {
              console.log(error)
              setNotificatonMessage({text: `${error} Data on ${newName} has already been removed from the server`,  success: false})
              setTimeout(() => setNotificatonMessage(null), 10000) 
            })
      } 
    } else {
      phonebookService.addContact(newPerson)
            .then(response => {
              console.log(response)
              setPersons(persons.concat({...newPerson, id: response.id})) 
              setNotificatonMessage({text: `Added ${newPerson.name}`,  success: true})
              setTimeout(() => setNotificatonMessage(null), 5000)
            })
            .catch(error => {
              console.log(error)
              setNotificatonMessage({text: `${error.response.data.error} Could not add ${newPerson.name} `, success: false})
              setTimeout(() => setNotificatonMessage(null), 5000)
            })
    }
  }

  const handleSearch = (event) => { 
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const fetchPersons = () => {
    phonebookService
      .fetchPersons()
      .then(response => setPersons(response))
      .catch(error => {
        setNotificatonMessage({text: ` ${error} Could not fetch contacts from server`,  success: false})
        setTimeout(() => setNotificatonMessage(null), 5000)
      })
  }
    
  useEffect(fetchPersons, []) 

  const handleDelete = (contact) =>  {
    console.log(`User wishes to delete ${contact}`)
    phonebookService.deletePerson(contact).then(response => console.log(response))
    setPersons(persons.filter(person => person.id !== contact))
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}></Notification> 
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