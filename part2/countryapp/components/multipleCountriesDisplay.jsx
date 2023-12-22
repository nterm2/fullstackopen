import SingleCountryDisplay from "./singleCountryDisplay"

const MultipleCountriesDisplay = ({ filteredCountries, buttonHandler, country }) => {
    return (
        filteredCountries.map(filteredCountryName =>{
            return (     
            <>
                <p key={filteredCountryName}>{filteredCountryName} <button onClick={() => buttonHandler(filteredCountryName)}>show</button></p>  
                {country !== null && country['name']['common']===filteredCountryName?<SingleCountryDisplay country={country} languages={Object.keys(country['languages'])}/>:<></>}
            </>
            )})
      )
}

export default MultipleCountriesDisplay