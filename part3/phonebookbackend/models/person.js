const mongoose = require('mongoose')
const password = process.env.DB_PASSWORD

const url = `mongodb+srv://fullstack:${password}@cluster0.lungpw3.mongodb.net/phonebookApps?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema(
    {
        "name": String,
        "number": String,
    }
) 

module.exports = mongoose.model('Person', phonebookSchema)