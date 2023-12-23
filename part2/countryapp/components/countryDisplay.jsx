import SingleCountryDisplay from "./singleCountryDisplay"
import TooManyCountriesDisplay from "./tooManyCountryDisplay"
import MultipleCountriesDisplay from "./multipleCountriesDisplay"

const CountryDisplay = ({ filteredCountries, country, buttonHandler, weatherData }) => {
    if (filteredCountries.length > 10) {
      return (
        <TooManyCountriesDisplay/>
      )
    }
  
    else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
      return (
        <MultipleCountriesDisplay filteredCountries={filteredCountries} buttonHandler={buttonHandler} country={country}/>
      )
    }
    else if (filteredCountries.length === 1 && country) {
      const languages = Object.keys(country['languages'])
      return (
        <SingleCountryDisplay country={country} languages={languages} weatherData={weatherData}/>)
    }
  }

  export default CountryDisplay