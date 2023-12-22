import { useEffect, useState } from "react"
import axios from 'axios'
import CountryDisplay from "../components/countryDisplay"

function App() {
  const [allCountries, setAllCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [showButtonClicked, setShowButtonClicked] = useState(false)
  const [clickedCountry, setClickedCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(
        response => {
          const countryNameArray = response.data.map((country) => country.name.common) 
          setAllCountries(countryNameArray)
        }
      )
  }, []
  )
  useEffect(() => {
    if (filteredCountries.length === 1) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filteredCountries[0]}`)
        .then(response => {
          setCountry(response.data)
        })
    }
  }, [filteredCountries])

  useEffect(function getCountryData() {
    if (showButtonClicked === true && clickedCountry !== null) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${clickedCountry}`)
        .then(response => {
          setCountry(response.data)
          // Reset setShowButtonClicked
          setShowButtonClicked(false)
        })
    }
  }, [showButtonClicked])

  const handleInputChange = (event) => {
    let inputValue = event.target.value
    let newCountries = allCountries.filter(country => country.toLowerCase().includes(inputValue))
    setFilteredCountries(newCountries)
  }

  const handleShowButtonClicked = (country) => {
    setClickedCountry(country)
    setShowButtonClicked(true)
  }
  if (allCountries) {
    return (
      <>
      <label htmlFor="find-countries">find countries</label>
      <input type="text" id="find-contries" onChange={handleInputChange}/>
      <CountryDisplay filteredCountries={filteredCountries} country={country} buttonHandler={handleShowButtonClicked}/>
      </>
    )
  }
  else {
    return null
  }

}

export default App
