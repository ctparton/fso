import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from "./components/Login";
import {useApolloClient, useSubscription} from "@apollo/client";
import RecommendedBooks from "./components/RecommendedBooks";
import {ALL_BOOKS, BOOKS_SUBSCRIPTION} from "./queries";
import {Button, Toolbar, Typography} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOKS_SUBSCRIPTION, {
      onSubscriptionData: ({ subscriptionData}) => {
          updateCacheWithItem(subscriptionData.data.bookAdded)
      }
  })
  const logout = () => {
      setToken(null)
      localStorage.clear()
      client.resetStore()
  }

  const updateCacheWithItem = (addedBook) => {
      const alreadyCached = (set, object) => set.map(p => p.id).includes(object.id)
      let dataInStore = client.readQuery({query: ALL_BOOKS})
      if (!alreadyCached(dataInStore.allBooks, addedBook)) {
          client.writeQuery({query: ALL_BOOKS,
              data: {allBooks: dataInStore.allBooks.concat(addedBook)}
          })
      }
  }

  return (
    <div>
      <div>
        <AppBar position={'static'}>
            <Toolbar>
                <Button variant='text' onClick={() => setPage('books')}>books</Button>
                {token ? <div>
                        <Button variant='text' onClick={() => setPage('authors')}><Typography>
                            authors
                        </Typography></Button>
                        <Button variant='text' onClick={() => setPage('add')}>add book</Button>
                        <Button variant='text' onClick={() => setPage('recommended')}>recommended</Button>
                        <Button variant='text' onClick={() => logout()}>logout</Button>
                    </div>
                    : <Button  variant='text'onClick={() => setPage('login')}>login</Button>}
            </Toolbar>
        </AppBar>



      </div>
      <Authors show={page === 'authors'}/>
      <Books show={page === 'books'}/>
      <NewBook show={page === 'add'}/>
      <RecommendedBooks show={page === 'recommended'}/>
      <Login setToken={setToken} setPage={setPage} show={page === 'login'}/>
    </div>
  )
}

export default App