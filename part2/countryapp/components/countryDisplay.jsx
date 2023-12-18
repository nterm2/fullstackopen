const CountryDisplay = ({ filteredCountries, country}) => {
    if (filteredCountries.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    }
  
    else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
      return (
        filteredCountries.map(country => <p key={country}>{country}</p>)
      )
    }
    else if (filteredCountries.length === 1 && country) {
      const languages = Object.keys(country['languages'])
      return (
        <>
        <h1>{country['name']['common']}</h1>
        <p>Capital: {country['capital'][0]}</p>
        <p>Area: {country['area']}</p>
        <b>langauges:</b>
        <ul>
          {
            languages.map(
              language => 
              <li key={language}>{country['languages'][language]}</li>) 
          }
        </ul>
        <img src={country['flags']['png']}/>
        </>
      )
    }
  }

  export default CountryDisplay