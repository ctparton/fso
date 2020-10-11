import React from 'react'
import {useQuery} from "@apollo/client";
import {ALL_AUTHORS} from '../queries'
import AuthorAdmin from "./AuthorAdmin";
import {Typography} from "@material-ui/core";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }


  if (result.loading)  {
    return (
        <div>loading...</div>
    )

  }

    return (
    <div>
      <Typography variant="h2">Authors</Typography>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data ? result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
      {result.data ? <AuthorAdmin authors={result.data.allAuthors}></AuthorAdmin> : null}
    </div>
  )
}

export default Authors
