import React, { useState, useEffect} from 'react'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

// Adding an entry to the phonebook
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

    personService
    .create(personObject)
      .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
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

  const deletePerson = (id) => {
    const array = [...persons]
    const index = persons.findIndex(element => element.id ===id)

    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      if (index !== -1) {
        array.splice(index, 1)
      }
    
      personService
      .deleteEntry(id, array)
        .then(setPersons(array))
      
      .catch(error => {
        alert(
          `the person '${id}' was already deleted from server`
        )
      }) 
    }
  }

  console.log("WARNING3")
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addNewName={addNewName}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} deletePerson={deletePerson}/>

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

const Persons = ({persons, newSearch, deletePerson}) => (
  <div>
    <table>
      <tbody>
          {(persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))).map(person => 
            <tr key={person.name}>
              <td>{person.name} </td>
              <td>{person.number} </td>
              <td><button onClick={() => deletePerson(person.id)}>delete</button></td>
            </tr>
          )}
      </tbody>
    </table>
  </div>
)

export default App