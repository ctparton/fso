import React, {useState} from 'react'
import Select from "react-select";
import {useMutation} from "@apollo/client";
import {EDIT_BORN, ALL_AUTHORS, ALL_BOOKS} from "../queries";

const AuthorAdmin = ({authors}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [born, setBorn] = useState('')
    const [editBorn, {data}] = useMutation(EDIT_BORN, {
        refetchQueries: [{query: ALL_BOOKS}, {query: ALL_AUTHORS}],
        onError: error => console.log(error)
    })
    if (!authors) {
        return null
    }
    let options = []
    authors.forEach(author => options.push({value: author.name, label: author.name}))
    console.log(authors)
    return (
        <div>
            <Select defaultValue={selectedOption} onChange={setSelectedOption} options={options}/>
            born <input value={born} onChange={event => setBorn(parseInt(event.target.value))}/>
            <button onClick={() => editBorn({variables: {name: selectedOption.value, born: born}})}>Edit birth year</button>
        </div>
    )
}

export default AuthorAdmin