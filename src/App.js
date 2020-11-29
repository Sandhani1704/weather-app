import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'weather-icons/css/weather-icons.css'
import Weather from './components/Weather'

const API_KEY = '30027e883a16a558f45f7e41dda98e31';



function App() {

  // const [weatherData, setWeatherData] = React.useState({ days: [] });
  const [weatherData, setWeatherData] = React.useState({
    city: undefined,
    country: undefined,
    temp: undefined,
    tempMax: undefined,
    tempMin: undefined,
    description: undefined,
  });

  const [weatherIcon, getWeatherIcon] = React.useState({icon:''});

  // React.useEffect(() => {
  //   const getWeather = async () => {
  //     const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=47.222531&lon=39.718705&units=metric&lang=ru&exclude=hourly,minutely,alerts&appid=${API_KEY}`)
  //       // const response = await apiCall.json();
  //       .then((res) => res.json());
  //     const dailyData = apiCall.daily;
  //     setWeatherData({ days: dailyData });
  //   }
  //   console.log(getWeather());
  // }, [])

  // console.log(getWeather())
  const calcCelsius = (temp) => {
    let cell = Math.floor(temp - 273, 15)
    return cell;
  }

  React.useEffect(() => {
    const getWeather = async () => {
      const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`)
      // .then((res) => res.json());
      const response = await apiCall.json();
      console.log(response);
      setWeatherData({
        city: response.name,
        country: null,
        temp: calcCelsius(response.main.temp),
        tempMax: calcCelsius(response.main.temp.max),
        tempMin: undefined(response.main.temp.min),
        description: response.weather[0].description,
      })
      getWeatherIcon({icon: ''});
    }
    getWeather();
  }, [])
  // console.log(getWeather())
  // const apiCall = fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`)
  // const response = apiCall.json();
  // console.log(response);

  return (
    <div className="App">
      <Weather city="h" country={weatherData.country} />
    </div>
  );
}

export default App;
