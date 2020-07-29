import React from 'react'

const Contacts = ({contacts, searchTerm, handleDelete}) => {
    return(
      <div>
        <ul>
        {contacts.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(person => <li key={person.name}><p>{person.name} {person.number}</p><button onClick={() => handleDelete(person.id)}>delete</button></li>)}
        </ul>
        
        
      </div>
    )
  }

export default Contacts
