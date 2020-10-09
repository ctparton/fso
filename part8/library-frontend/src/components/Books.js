import React, {useState} from 'react'
import {useQuery} from "@apollo/client";
import { ALL_BOOKS} from "../queries";
import Select from "react-select";

const Books = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const result = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return (
        <div>Loading</div>
    )
  }

  let options = []
  if (result.data) {
    console.log(JSON.stringify(result.data))
    options.push({value: 'ALL GENRES', label: 'Everything!'})
    result.data.allBooks.forEach(book => book.genres.forEach(genre => {
      console.log(`Current genre is ${genre}`)
      options.push({value: genre, label: genre})
    }))
    console.log(`Current options are ${options}`)
  }


  return (
    <div>
      <h2>books</h2>

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
          {result.data && (!selectedOption || selectedOption.value === 'ALL GENRES') ? result.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ) : result.data.allBooks.filter(book => book.genres.includes(selectedOption.value)).map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
          ) }
        </tbody>
      </table>
      <Select defaultValue={selectedOption} onChange={setSelectedOption} options={options}/>
    </div>
  )
}

export default Books