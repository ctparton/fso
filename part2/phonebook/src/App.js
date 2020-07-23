import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', key: 'Arto Hellas'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const handleNewEntry = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhonebook = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      key: newName
    }
    persons.map(person => person.name).indexOf(newName) > -1 
    ? alert("Person already added!") 
    : setPersons(persons.concat(newPerson))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handlePhonebook}>
        <div>
          name: <input value={newName} onChange={handleNewEntry}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p>{person.name}</p>)}
    </div>
  )
}

export default App