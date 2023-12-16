import { useState, useEffect} from 'react'
import phonebookServices from "/components/phonebookServices.js"

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

const Persons = ({ persons, setPersons }) => {
  const handlePersonDeletion = (personName, personID) => {
    let deletePerson = confirm(`Delete ${personName}?`)
    if (deletePerson){
      phonebookServices
        .deletePerson(personID)
        .then(() => {
          const cleanedPersons = persons.filter(person => person.name !== personName)
          setPersons(cleanedPersons)
          console.log(cleanedPersons)
        })
    }
  }
  return (
    <>
      {persons.map(
        (person) => {
          return (
            <div key={person.id}>
              <p>{ person.name } {person.number}</p>
              <button onClick={() => handlePersonDeletion(person.name, person.id)}>Delete</button>
            </div>
          )
      }
    )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  useEffect(() => {
    phonebookServices.getNumbers()
      .then(
        persons => {
          setPersons(persons)
        }
      )
  }, [])

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberInput = (event) => {
    setPhoneNumber(event.target.value)
  }

  const storePerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: phoneNumber}

    const nameExists = persons.filter((person) => person.name === newName)
    if (nameExists.length !== 0) {
      const existingPerson = nameExists[0]
      const existingPersonNumber = existingPerson.number 
      if (existingPersonNumber !== phoneNumber) {
        const replaceNumber = confirm(`${newName} is already added to the phonebook, replace old number with a new one?`)
        if (replaceNumber) {
          phonebookServices
            .updateNumber(existingPerson.id, newPerson)
        }
        const updatedPersons = persons.map(person => person.id !== existingPerson.id ? person : existingPerson)
      }
      else {
        alert(`${newName} is already added to the phonebook`)
      }

    }

    else {
      phonebookServices
        .postNumber(newPerson)
        .then(
          (createdPerson) => {
          setPersons(persons.concat(createdPerson))
          setPhoneNumber('')
          setNewName('')
          }
        )

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
      <Persons persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App