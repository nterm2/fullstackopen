const SingleCountryDisplay = ({ country, languages, weatherData }) => {
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
            <h1>Weather in {country['capital'][0]}</h1>

            {weatherData?
                <>
                    <p>temperature {weatherData['current']['temp']} Celcius</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData["current"]["weather"][0]["icon"]}@2x.png`}/>
                    <p>wind {weatherData['current']['wind_speed']}</p>
                </>
            :
                <></>
        }
            
        </>
      )
}

export default SingleCountryDisplay;