import React, { useState, useEffect} from 'react'
import axios from 'axios'

function App() {

  const [ newSearch, setNewSearch ] = useState('')
  const [ countries, setCountries ] = useState([])

  // Retrieve list of countries
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }


  return (
    <div>
      <Filter handleSearchChange={handleSearchChange} newSearch={newSearch}/>
      <CountryList countries={countries} newSearch={newSearch}/>
    </div>
  );
}

const Filter = ({newSearch, handleSearchChange}) => (
  <div>
    find countries <input
      value={newSearch}
      onChange={handleSearchChange}
    />
  </div>  
)

const CountryList = ({countries, newSearch}) => {

  const [ shouldShow, setShouldShow ] = useState({})
  

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))

  const handleShowCountry = (country) => {
    setShouldShow(country)
  }

  let showCountry
  if (Object.keys(shouldShow).length > 0) {
    const flagAltText = `flag of ${shouldShow.name}`
    showCountry = <CountryDisplay country={shouldShow} flagAltText={flagAltText}/>
  }

  if (filteredCountries.length > 10) {
    return (
        <div>
          Too many matches, specify another filter
        </div>
    )
  } if (filteredCountries.length === 1) {
    const selected = filteredCountries[0]
    const flagAltText = `flag of ${selected.name}`
    return (
        <CountryDisplay country={selected} flagAltText={flagAltText}/>
    )
  } else {
    return (
      <div>
        <table>
          <tbody>
            {(countries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))).map(country => 
              <tr key={country.name}>
                <td>{country.name} </td>
                <td><button onClick={() => {handleShowCountry(country)}}>show</button></td>
              </tr>
            )}
          </tbody>
        </table>
      {showCountry}
      </div>
      
    )
  }
}

const CountryDisplay = ({country, flagAltText}) => {
  return(
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Spoken Languages</h2>
      <ul>
        {country.languages.map(language => 
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} height="100" alt={flagAltText}></img>
      <WeatherDisplay city={country.capital}/>
    </div>
  )
}

const WeatherDisplay = ({city}) => {

  const [ weather, setWeather ] = useState([])
  
  // Retrieve list of countries
  const hook = () => {
    const api_key = (process.env.REACT_APP_API_KEY).replace(/'/g,"").trim();
    console.log(api_key);
    const weatherAPILink = "http://api.weatherstack.com/current?access_key=" + api_key + "&query=" + city
    console.log(weatherAPILink);
    axios
      .get(weatherAPILink)
      .then(response => {
        console.log(response.data);
        setWeather(response.data)
      })
  }
  
  useEffect(hook, [city])

  if(Object.keys(weather).length > 0) {
    return (
      <div>
        <h2>Weather in {city}</h2>
        <p>temperature: {weather.current.temperature} Celsius</p>
        <img src={weather.current.weather_icons[0]} height="100" alt={weather.current.weather_descriptions[0]}></img>
        <p>Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
      </div>
    )
  } else {
    return (
      <div>
        
      </div>
    )
  }


}



export default App;
