import React, { useEffect, useState } from 'react';

import { UilWind } from '@iconscout/react-unicons';
import {WiHumidity} from "weather-icons-react";




import './App.css'

const api = {
  base: "https://api.openweathermap.org/data/2.5/"
}



function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  useEffect(
    () => {
     const city = "Darbhanga"
      fetch(`${api.base}weather?q=${city}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
       
      });
    }
  ,[])

  const search = evt => {
  
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
         
        });
    
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Enter City..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            // onKeyPress={search}
          />

          <button onClick={search} id='srh-btn'>Search</button>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
           <div>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} sizes='50px' alt='wth-img'></img>
              </div>

           <h1 className='temperature'>
              {Math.round(weather.main.temp)}°c 
              </h1>
             
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
            
              <p className='wind-speed'>
                {Math.round(weather.wind.speed)}km/h <span><UilWind /></span>
                </p>

                <p className='humidity'>
                {Math.round(weather.main.humidity)}<span><WiHumidity size={28} /></span>  
                </p>

               

            </div>
          
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;