require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
const Person = require('./models/person')

morgan.token('post_data', (request, response) => {
    if (request.method === "POST") {
        console.log(request.body)
        return JSON.stringify(request.body)
    }
    return null
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_data'))

app.get('/api/persons/', (request, response) => {
    Person.find({}).then(
        person => {
            response.json(person)
        }
    )
})

app.get('/info', (request, response) => {
    const requestReceptionTime = new Date()
    const numOfPeople = persons.length 
    response.send(`
    <p>Phonebook has info for ${numOfPeople} people</p>
    <p>${requestReceptionTime}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(
        person => {
            response.json(person)
        }
    )
    .catch(
        person => {
            response.status(404).end()
        }
    )
}
)

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})


app.post('/api/persons', (request, response) => {
    const newPerson = request.body 
    if (!newPerson.name || !newPerson.number) {
        response.status(404).json({"error": "You must provide new person a name and a number."})
    } 
    else {
        const person = new Person({
            name: newPerson.name, 
            number: newPerson.number
        })
        person.save().then(savedPerson => {response.json(savedPerson)})
    }
})
const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
