const SingleCountryDisplay = ({ country, languages }) => {
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

export default SingleCountryDisplay;