import axios from 'axios'

const baseURL = 'http://localhost:3004/api/persons/'
const getNumbers = () => {
    const response = axios.get(baseURL)
    return response.then(response => response.data)
}

const postNumber = (newPerson) => { 
    const response = axios.post(`${baseURL}`, newPerson)
    return response.then(response => response.data)
}

const deletePerson = (personID) => {
    const response = axios.delete(`${baseURL}/${personID}`)
    return response.then(response => response.data)
}

const updateNumber = (personID, updatedPerson) => {
    const response = axios.put(`${baseURL}/${personID}`, updatedPerson)
    return response.then(response => response.data)
}
export default {getNumbers, postNumber, updateNumber, deletePerson};