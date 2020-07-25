import React from 'react'

const Contacts = ({contacts, searchTerm}) => {
    return(
      <div>
        {contacts.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(person => <p>{person.name} {person.number}</p>)
        }
      </div>
    )
  }

export default Contacts
