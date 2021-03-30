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

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))

  if (filteredCountries.length > 10) {
    return (
        <div>
          Too many matches, specify another filter
        </div>
    )
  } if (filteredCountries.length === 1) {
    const selected = filteredCountries[0]
    return (
        <div>
          <h1>{selected.name}</h1>
          <p>capital {selected.capital}</p>
          <p>population {selected.population}</p>
          <h2>languages</h2>
          <ul>
            {selected.languages.map(language => 
              <li key={language.name}>{language.name}</li>
            )}
          </ul>
          <img src={selected.flag} height="100"></img>
          
        </div>
    )
  } else {
    return (
      <table>
        <tbody>
          {(countries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))).map(country => 
            <tr key={country.name}>
              <td>{country.name} </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

const PopularAnecdote = (props) => {

  function findIndexOfMaxNumber(inputArray){
    var max = inputArray[0];
    var maxIndex = 0;

    for (var i = 1; i < inputArray.length; i++) {
      if (inputArray[i] > max) {
        maxIndex = i;
        max = inputArray[i];
      }
    }
    return maxIndex;
  }

  return (
    <div>
      <h1>Anecdote with the most votes</h1>
      <p>
        {props.anecdotes[findIndexOfMaxNumber(props.totalVotes)]}
      </p>
      <p>
        has {props.totalVotes[findIndexOfMaxNumber(props.totalVotes)]} votes
      </p>
    </div>
  )
}

export default App;
