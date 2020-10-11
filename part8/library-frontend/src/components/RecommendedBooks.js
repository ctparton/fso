import React, {useState} from 'react'
import {useQuery} from "@apollo/client";
import { ALL_BOOKS, ME} from "../queries";
import {Typography} from "@material-ui/core";

const Recommended = ({show}) => {
    const result = useQuery(ALL_BOOKS)
    const resultMe = useQuery(ME)
    if (!show) {
        return null
    }
    if (result.loading) {
        return (
            <div>Loading</div>
        )
    }

    resultMe.data ? console.log(resultMe.data) : console.log('not ready')
    return (
        <div>
            <Typography variant="h2">Books</Typography>
            {resultMe.data ? <Typography>Your favourite genre is <strong>{resultMe.data.me.favoriteGenre}</strong></Typography> : null}
            <Typography>Below are recommended books based off your favourite genre</Typography>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                        author
                    </th>
                    <th>
                        published
                    </th>
                </tr>
                {result.data && resultMe.data ? result.data.allBooks.filter(book => book.genres.includes(resultMe.data.me.favoriteGenre)).map(a =>
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                ) : null}
                </tbody>
            </table>
        </div>
    )
}

export default Recommended