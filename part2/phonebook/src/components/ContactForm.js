import React from 'react'

const ContactForm = ({newContactHandler, name, newNameHandler, number, newNumberHandler}) =>  {
    return(
      <div>
         <form onSubmit={newContactHandler}>
      <div>
            name: <input value={name} onChange={newNameHandler}/>
          </div>
          <div>
            number: <input value={number} onChange={newNumberHandler}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
    </form>
      </div>
    )
  }

export default ContactForm