import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '541-251-2314'},
    { name: 'Haley Whitman', number: '541-212-2222' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <div>
        <table>
          <tbody>
              {persons.map(person => 
                <tr key={person.name}>
                  <td>{person.name} </td>
                  <td>{person.number} </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App