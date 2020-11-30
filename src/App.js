import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'weather-icons/css/weather-icons.css'
import Weather from './components/Weather'
import Form from './components/Form'

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
    //icon: undefined,
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

  const [city, setCity] = React.useState('');
  const [country, setCountry] = React.useState('');

  const getWeatherIcon = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        setWeatherIcon({ icon: icons.Thunderstorm })
        break;
      case rangeId >= 300 && rangeId <= 321:
        setWeatherIcon({ icon: icons.Drizzle })
        break;
      case rangeId >= 500 && rangeId <= 531:
        setWeatherIcon({ icon: icons.Rain })
        break;
      case rangeId >= 600 && rangeId <= 622:
        setWeatherIcon({ icon: icons.Snow })
        break;
      case rangeId >= 701 && rangeId <= 781:
        setWeatherIcon({ icon: icons.Atmosphere })
        break;
      case rangeId === 800:
        setWeatherIcon({ icon: icons.Clear })
        break;
      case rangeId >= 801 && rangeId <= 804:
        setWeatherIcon({ icon: icons.Clouds })
        break;
      default: setWeatherIcon({ icon: icons.Clear });
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

  const calcCelsius = (temp) => {
    let cell = Math.floor(temp - 273, 15)
    return cell;
  }

  // function handleInputCityAndCountryChange(event) {
  //   const { city, country } = event.target.value
  //   setCity(value);
  //   setCountry(value);
  // }

  // React.useEffect(() => {
  //   Promise.all([getWeatherIcons(), getWeather()])
  // }, []);
  React.useEffect(() => {
    const getWeather = async () => {
      // handleInputCityAndCountryChange()
      // event.preventDefault();
      // const { city, country } = event.target.value
      // if (city && country) {
      // const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`)
      const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)
      const response = await apiCall.json()
      setWeatherData({
        city: response.name,
        country: response.sys.country,
        temp: calcCelsius(response.main.temp),
        tempMax: calcCelsius(response.main.temp_min),
        tempMin: calcCelsius(response.main.temp_max),
        description: response.weather[0].description,
      });
      getWeatherIcon(weatherIcon, response.weather[0].id)
      // } else console.error();
    }
    getWeather()
  }, []);

  // React.useEffect(() => {
  //   Promise.all([getWeather(), getWeatherIcons()])
  // }, []);

  return (
    <div className="App">
      <Form />
      <Weather
        city={weatherData.city}
        country={weatherData.country}
        temp={weatherData.temp}
        tempMax={weatherData.tempMax}
        tempMin={weatherData.tempMin}
        description={weatherData.description}
        icon={weatherIcon.icon}
      />
    </div>
  );
}

export default App;
