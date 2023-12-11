import { useState } from 'react'

const Filter = ({ filterHandler }) => {
  return (
    <p>filter shown with <input onChange={filterHandler}/></p>
  )
}

const PersonForm = (props) => {
 return (
    <form onSubmit={props.storePerson}>
      <div>
        name: <input onChange={props.handleNameInput} value={props.newName}/>
        phone number: <input onChange={props.handlePhoneNumberInput} value={props.phoneNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
 )
}

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map(
      (person) => <p key={person.name}>{ person.name } {person.number}</p>
    )}
    </>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberInput = (event) => {
    setPhoneNumber(event.target.value)
  }

  const storePerson = (event) => {
    event.preventDefault()
    const nameExists = persons.filter((person) => person.name === newName)
    console.log(nameExists)
    if (nameExists.length !== 0) {
      alert(`${newName} is already added to the phonebook`)
    }
    else {
      const newPersons = { name: newName, number: phoneNumber}
      setPersons(persons.concat(newPersons))
      setPhoneNumber('')
      setNewName('')
    }
  }

  const handleFilterValue = (event) => {
    const value = event.target.value 
    setFilterValue(value)
    const filteredPeople = persons.filter((person) => {
      const tempName = person.name.toLowerCase();
      const tempValue = value.toLowerCase();
      return tempName.includes(tempValue)
    })
    setPersons(filteredPeople)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterHandler={handleFilterValue}/>
      <h3>Add a new person</h3>
      <PersonForm storePerson={storePerson} handleNameInput={handleNameInput} newName={newName} handlePhoneNumberInput={handlePhoneNumberInput} phoneNumber={phoneNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )
}

export default App