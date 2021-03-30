import React, { useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  // Retrieve list of entries in phonebook
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

const addNewName = (event) => {
    event.preventDefault()

    function nameExists(name) {
      return persons.some(function(element) {
        return element.name === name
      })
    }

    if (nameExists(newName)) {
      console.log("MATCH");
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    console.log(newSearch)
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addNewName={addNewName}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} />

    </div>
  )
}

const Filter = ({newSearch, handleSearchChange}) => (
  <div>
    filter shown with a <input
      value={newSearch}
      onChange={handleSearchChange}
    />
  </div>  
)

const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, addNewName}) => (
  <form onSubmit={addNewName}>
  <div>
    name: <input 
     value={newName}
     onChange={handleNameChange}
     />
  </div>
  <div>
    number: <input 
    value={newNumber}
    onChange={handleNumberChange}
    />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
)

const Persons = ({persons, newSearch}) => (
  <div>
    <table>
      <tbody>
          {(persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))).map(person => 
            <tr key={person.name}>
              <td>{person.name} </td>
              <td>{person.number} </td>
            </tr>
          )}
      </tbody>
    </table>
  </div>
)

export default App