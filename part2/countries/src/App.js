import React, {useState, useEffect} from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] =  useState([])
  const [viewToggle, setToggle] = useState(false)

  const fetchCountryDataHook = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        const allCountries = response.data
        setCountries(allCountries)
      })
  }
  useEffect(fetchCountryDataHook, [])
  
  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  // works for show button but state gets stuck
  const showHandler = (country, countriesToShow) => {
    countriesToShow.filter(c => c.name === country.name)
    setToggle(!viewToggle)
  }

  return (
    <div className="App">
      <Search searchTerm={searchTerm} searchHandler={handleSearch}></Search>
      <Countries countries={countries} searchTerm={searchTerm} showHandler={showHandler}></Countries>
    </div>
  );
}

const Search = ({searchTerm, searchHandler}) => {
  return (
    <div>
      Find Countries <input value={searchTerm} onChange={searchHandler}></input>
    </div>
  )
}
const Countries = ({countries, searchTerm, showHandler}) => {
  const countriesToShow = countries.filter(country => {
    return country.name.toLowerCase().includes(searchTerm.toLowerCase())
  })
    
  return (
    <div>
      {countriesToShow.length > 10 
      ? <p>Too many matches, make search more specific</p>
      : countriesToShow.length !== 1 
      ? countriesToShow.map(country => <><p>{country.name}</p><button onClick={() =>showHandler(country, countriesToShow)}>show</button></>)
      : <Country country={countriesToShow[0]} ></Country>}
    </div>
  )
}

const Country = ({country}) => {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>Capital {country.capital}</p> 
        <p>Population {country.population}</p> 
        <h2>Languages</h2>
        <ul>
        {country.languages.map(language => <li>{language.name}</li>)}
        </ul>
        <img src={country.flag}  width="200px" height="200px"/>
        
      </div>)
}
export default App;
