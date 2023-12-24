const express = require('express')
const app = express()
app.use(express.json())
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons/', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const requestReceptionTime = new Date()
    const numOfPeople = persons.length 
    console.log(persons)
    response.send(`
    <p>Phonebook has info for ${numOfPeople} people</p>
    <p>${requestReceptionTime}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

function generateId() {
    return Math.random() * 1000 
}
app.post('/api/persons', (request, response) => {
    const person = request.body 
    console.log(person)
    console.log(person)
    const id = generateId()
    person.id = id
    persons = persons.concat(person)
    response.status(200).end()
})
const PORT=3004
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
