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
    icon: undefined,
  });

  const [weatherIcon, setWeatherIcon] = React.useState({
    Thunderstorm: 'wi-thunderstorm',
    Drizzle: 'wi-sleet',
    Rain: 'wi-storm-showers',
    Snow: 'wi-snow',
    Atmosphere: 'wi-fog',
    Clear: 'wi-day-sunny',
    Clouds: 'wi-day-fog',
  });

  const getWeatherIcon = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        setWeatherData({ icon: icons.Thunderstorm })
        break;
      case rangeId >= 300 && rangeId <= 321:
        setWeatherData({ icon: icons.Drizzle })
        break;
      case rangeId >= 500 && rangeId <= 531:
        setWeatherData({ icon: icons.Rain })
        break;
      case rangeId >= 600 && rangeId <= 622:
        setWeatherData({ icon: icons.Snow })
        break;
      case rangeId >= 701 && rangeId <= 781:
        setWeatherData({ icon: icons.Atmosphere })
        break;
      case rangeId === 800:
        setWeatherData({ icon: icons.Clear })
        break;
      case rangeId >= 801 && rangeId <= 804:
        setWeatherData({ icon: icons.Clouds })
        break;
      default: setWeatherData({ icon: icons.Clear });
    }
  }

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

  // React.useEffect(() => {
  const getWeather = async () => {
    const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`)
    const response = await apiCall.json()
    setWeatherData({
      city: response.name,
      country: response.sys.country,
      temp: calcCelsius(response.main.temp),
      tempMax: calcCelsius(response.main.temp_min),
      tempMin: calcCelsius(response.main.temp_max),
      description: response.weather[0].description,
      // icon: null,
    });
    // getWeatherIcon(weatherIcon, response.weather[0].id)


  }
  // getWeather();
  // }, [])

  // React.useEffect(() => {
  const getWeatherIcons = async () => {
    const apiCallIcons = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`)
    const responseIcons = await apiCallIcons.json();
    getWeatherIcon(weatherIcon, responseIcons.weather[0].id)
  }
  // getWeatherIcons();
  // }, [])

  React.useEffect(() => {
    Promise.all([getWeatherIcons(), getWeather()])
  }, []);

  React.useEffect(() => {
    Promise.all([getWeather(), getWeatherIcons()])
  }, []);

  return (
    <div className="App">
      <Weather
        city={weatherData.city}
        country={weatherData.country}
        temp={weatherData.temp}
        tempMax={weatherData.tempMax}
        tempMin={weatherData.tempMin}
        description={weatherData.description}
        icon={weatherData.icon}
      />
    </div>
  );
}

export default App;
