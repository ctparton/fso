import React, {useState} from 'react'
import {useQuery} from "@apollo/client";
import { ALL_BOOKS} from "../queries";
import Select from "react-select";
import {Table, TableBody, TableContainer, TableRow, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import makeStyles from "@material-ui/core/styles/makeStyles";

const Books = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const result = useQuery(ALL_BOOKS)
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  })
  const classes = useStyles()
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
    options.push({value: 'ALL GENRES', label: 'Everything!'})
    result.data.allBooks.forEach(book => book.genres.forEach(genre => {
      options.push({value: genre, label: genre})
    }))
  }



  return (
    <div>
      <Typography variant="h3">Books</Typography>
      <Typography variant="h5">Select Genre</Typography>
      <Select defaultValue={selectedOption} onChange={setSelectedOption} options={options}/>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="right"></TableCell>
                <TableCell align="right">author</TableCell>
                <TableCell align="right">published</TableCell>
              </TableRow>
            </TableHead>

          <TableBody>
          {result.data && (!selectedOption || selectedOption.value === 'ALL GENRES') ? result.data.allBooks.map(a =>
              <TableRow key={a.title}>
                <TableCell component="th" scope="row">{a.title}</TableCell>
                <TableCell align="right">{a.author.name}</TableCell>
                <TableCell align="right">{a.published}</TableCell>
              </TableRow>
          ) : result.data.allBooks.filter(book => book.genres.includes(selectedOption.value)).map(a =>
              <TableRow key={a.title}>
                <TableCell component="th" scope="row">{a.title}</TableCell>
                <TableCell align="right">{a.author.name}</TableCell>
                <TableCell align="right">{a.published}</TableCell>
              </TableRow>
          ) }
          </TableBody>
        </Table>
      </TableContainer>


    </div>
  )
}

export default Books