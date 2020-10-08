import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context'

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('current-user')
    return {
        headers: {...headers, authorization: token ? `bearer ${token}` : null}
    }
})

const httpLink = new HttpLink({
    uri: 'http://localhost:4000',
})
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    ,
    document.getElementById('root'))