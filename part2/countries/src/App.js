import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] =  useState([])
  const [currentCountry, setCurrent] = useState('')

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
    setCurrent(event.target.value)
  }

  const countriesToShow = countries.filter(country => {
    console.log(`the current selected country is ${currentCountry.length}`)
    return country.name.toLowerCase().includes(currentCountry.toLowerCase()) })
   
  

  return (
    <div className="App">
      <Search searchTerm={currentCountry} searchHandler={handleSearch} ></Search>
      <Countries countries={countriesToShow} showHandler={setCurrent}></Countries>
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
const Countries = ({countries, showHandler}) => {
  return (
    <div>
      {countries.length > 10 
      ? <p>Too many matches, make search more specific</p>
      : countries.length !== 1 
      ? countries.map(country => <><p>{country.name}</p><button onClick={() => showHandler(country.name)}>show</button></>)
      : <Country country={countries[0]} ></Country>}
    </div>
  )
}

const Weather = ({weather, city}) => {
  console.log(weather)
  if (!weather) {
    return null
  }
   
  return (
    <div>
      <h1>Weather in {city}</h1>
      <p>Temperature {weather.temperature} &#8451; and {weather.weather_descriptions[0]} (last updated: {weather.observation_time})</p>
      <img src={weather.weather_icons[0]} alt="Descriptive weather icon"></img>
    </div> 
  )
}

const Country = ({country}) => {
    const [weather, setWeather] = useState(null) 
    console.log()
    const fetchWeatherDataHook = () => {
      axios
        .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
        .then(response => setWeather(response.data.current))
    }
    useEffect(fetchWeatherDataHook, [])
    return (
      <div>
        <h1>{country.name}</h1>
        <p><strong>Capital</strong> {country.capital}</p> 
        <p><strong>Population</strong> {country.population.toLocaleString()}</p> 
        <h2>Spoken Languages</h2>
        <ul>
        {country.languages.map(language => <li>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt={country.name + " flag"} width="200px" height="200px" padding="10px"/>
        <Weather weather={weather} city={country.capital}/>
      </div>)
}
export default App;
