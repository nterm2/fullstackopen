import { useState, useEffect} from 'react'
import './index.css'

import phonebookServices from "/components/phonebookServices.js"
import Filter from '../components/filter'
import Notification from '../components/notification'
import PersonForm from '../components/personform'
import Persons from '../components/persons'

const App = () => {
  const [message, setMessage] = useState(null)
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [successfulMessage, setSuccessfulMessage] = useState(true)
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
            .then(
              () => {
                setSuccessfulMessage(true)
                setMessage(`Updated ${newPerson.name}`)
                setTimeout(() => setMessage(null), 5000)
              }
            )
            .catch(
              () => {
                setSuccessfulMessage(false)
                setMessage(`Information of ${newPerson.name} has already been removed from server`)
                setTimeout(() => setMessage(null), 5000)
              }
            )

        }
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
          setSuccessfulMessage(true)
          setPersons(persons.concat(createdPerson))
          setPhoneNumber('')
          setNewName('')
          setMessage(`Added ${newPerson.name}`)
          setTimeout(() => setMessage(null), 5000)
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
      <Notification message={message} successfulMessage={successfulMessage}/>
      <Filter filterHandler={handleFilterValue}/>
      <h3>Add a new person</h3>
      <PersonForm storePerson={storePerson} handleNameInput={handleNameInput} newName={newName} handlePhoneNumberInput={handlePhoneNumberInput} phoneNumber={phoneNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App