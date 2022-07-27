import axios from 'axios'
import { useEffect, useState } from 'react'

//import Filter from './components/Filter'
//import PersonForm from './components/PersonForm'
//import Persons from './components/Persons'

const App = () => {
  const[countries, setCountries] = useState([])
  const[countriesFull, setCountriesFull] = useState([])
  const[newFilter, setNewFilter] = useState('')
  const[weather,setWeather] = useState([])


  const Countrydata = ({country}) => {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <p><b>languages</b></p>
          <ul>
            {Object.values(country.languages).map(
              lang => 
                <li key={lang}>{lang}</li>
            )}
          </ul>
        <p>{country.flag}</p>
      </div>
    )
  }

  const Countryweather = ({country}) => {
    const params = {
      lat: country.latlng[0],
      long: country.latlng[1],
      api_key: process.env.REACT_APP_API_KEY
    }

    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.long}&appid=${params.api_key}`)
        .then(response => {
            setWeather(response.data)
        })
    }, [])

    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>temp {weather.main.temp - 273} celsius</p>
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    )

  }

  const Countries = ({countries}) => {
    if (countries.length>10) {
        return (
          <p>Too many matches, specify another filter</p>
        )
    }
    else if (countries.length<=10 && countries.length>1) {
        return (
          countries.map(country=>
            <div>
            <p key={country.name.common}>{country.name.common}</p>
            <button onClick={()=>setCountries([country])}>
              show
            </button>
            </div>    
          )
        )
    }
    else if (countries.length===1) {
      const country1 = countries[0];
      return (
        <div>
          <Countrydata key={country1} country={country1}/>
          <Countryweather key={1} country={country1}/>
        </div>
      )
    }
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
          setCountriesFull(response.data)
      })
  }, [])

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
    setCountries(countriesFull.filter(country => country.name.common.includes(newFilter)))
  }

  return (
    <div>
      <p>find countries</p>
      <form>
        <input
        value = {newFilter}
        onChange = {handleNewFilter}
        />
      </form>
      <Countries
        countries={countries} />
    </div>
  );
}

export default App;
