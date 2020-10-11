import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name,
            born,
            bookCount
        }
    }  
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author {
                name
            }
            published
            genres
        }
    }
`

export const ADD_BOOK = gql`
    mutation addNewBook($title: String!, $author: String!, $published: Int!, $genres:  [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ){
            title,
            published,
            genres
       }}
`

export const EDIT_BORN = gql`
    mutation changeBirthYear($name : String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            name,
            born
        }
    }   
`

export const LOGIN = gql`
    mutation loginUser($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const ME = gql`
    query {
        me {
            username,
            favoriteGenre
        }
    }
`
export const BOOKS_SUBSCRIPTION = gql`
    subscription {
        bookAdded {
            title
            author {
                name
            }
            published
            genres
            id
        }
    }
`