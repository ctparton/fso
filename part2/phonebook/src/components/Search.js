import React from 'react'

const Search = ({searchTerm, searchContacts}) => {
    return (
      <div>
        Filter contacts: <input value={searchTerm} onChange={searchContacts}/>
      </div>
    )
  }

export default Search