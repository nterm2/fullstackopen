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

app.get('/api/persons/', (request, response, next) => {
    Person.find({}).then(
        person => {
            response.json(person)
        }
    ).catch(error => next(error))
})

app.get('/info', async (request, response) => {
    const requestReceptionTime = new Date()
    const numOfPeople = await Person.countDocuments({})
    response.send(`
    <p>Phonebook has info for ${numOfPeople} people</p>
    <p>${requestReceptionTime}</p>
    `)
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(
        person => {
            response.json(person)
        }
    )
    .catch(error => next(error))
}
)

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(
        result => {
            response.status(204).end()
        }
    )
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
    const newPerson = request.body 
    if (!newPerson.name || !newPerson.number) {
        response.status(404).json({"error": "You must provide new person a name and a number."})
    } 
    else {
        const person = new Person({
            name: newPerson.name, 
            number: newPerson.number
        })
        person.save()
        .then(savedPerson => {response.json(savedPerson)})
        .catch(error => next(error))
    }
})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id 
    const person = {
        name: request.body.name,
        number: request.body.number
    }
    Person.findByIdAndUpdate(id, person, {new: true, runValidators: true, context: 'query'}).then(updatedPerson => response.json(updatedPerson)).catch(error => next(error))
}
)

const errorHandler = (error, request, response, next) => {
    console.error(error)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({error: "Name must be at least three characters long/phone number must be in correct format"})
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
