import React from 'react'

const Contacts = ({contacts, searchTerm, handleDelete}) => {
    return(
      <div>
        {contacts.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(person => <><p>{person.name} {person.number}</p><button onClick={() => handleDelete(person.id)}>delete</button></>)
        }
      </div>
    )
  }

export default Contacts
