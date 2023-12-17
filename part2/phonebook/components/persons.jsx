import phonebookServices from "/components/phonebookServices.js"

const Persons = ({ persons, setPersons }) => {
    const handlePersonDeletion = (personName, personID) => {
      let deletePerson = confirm(`Delete ${personName}?`)
      if (deletePerson){
        phonebookServices
          .deletePerson(personID)
          .then(() => {
            const cleanedPersons = persons.filter(person => person.name !== personName)
            setPersons(cleanedPersons)
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

export default Persons