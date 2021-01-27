import './App.css';
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'weather-icons/css/weather-icons.css'
import Weather from './Weather'
import Cards from './Cards'
import Form from './Form'
import { API_KEY } from '../utils/utils';

function App() {

  const [weatherData, setWeatherData] = React.useState({
    city: undefined,
    country: undefined,
    temp: undefined,
    tempMax: undefined,
    tempMin: undefined,
    description: undefined,
    icon: undefined,
  });

  const [weatherDays, setWeatherDays] = React.useState({ days: [] })

  const getWeather = async (e) => {
    e.preventDefault()
    const location = e.target.elements.city.value

    if (location) {
      const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&lang=ru&units=metric&APPID=${API_KEY}`)
      const response = await apiCall.json()
      console.log(response)
      const dailyData = response.list.slice(0, 40);

      let weatherInfo = []
      let dateToIndexMap = {}

      const newData = response.list.forEach((item, index) => {
        let day = item.dt_txt.split(' ')[0]; // Дата как ключ
        let currentDayIndex = dateToIndexMap[day];

        if (currentDayIndex == null || currentDayIndex == undefined) {
          currentDayIndex = Object.keys(dateToIndexMap).length;
          dateToIndexMap[day] = currentDayIndex;
        }
        if (weatherInfo[currentDayIndex] == null || weatherInfo[currentDayIndex] == undefined) {  // если у нас нет такого ключа, то создаем
          weatherInfo[currentDayIndex] = { max_temp: -100, min_temp: 100, icon: null, date: day, description: '' }; // 
        }
        if (weatherInfo[currentDayIndex].max_temp < item.main.temp) {
          weatherInfo[currentDayIndex].max_temp = item.main.temp;
        }
        if (weatherInfo[currentDayIndex].min_temp > item.main.temp) {
          weatherInfo[currentDayIndex].min_temp = item.main.temp;
        }
        if (weatherInfo[currentDayIndex].description == '') { //
          weatherInfo[currentDayIndex].description = item.weather[0].description //
        } //
        if (item.dt_txt.split(' ')[1] === '12:00:00') {
          weatherInfo[currentDayIndex].icon = item.weather[0].icon
          weatherInfo[currentDayIndex].description = item.weather[0].description
        } else if (weatherInfo[currentDayIndex].icon == null) {
          weatherInfo[currentDayIndex].icon = item.weather[0].icon
        }
      });
      console.log(weatherInfo)

      setWeatherDays({ days: weatherInfo })

      setWeatherData({
        city: `${response.city.name}, ${response.city.country}`,
        country: response.city.country,
        temp: Math.round(response.list[0].main.temp),
        description: response.list[0].weather[0].description,
        icon: response.list[0].weather[0].icon
      });
    } else console.error();
  }

  return (
    <div className="App">
      <div className='App__image'>
        <Form getWeather={getWeather} />
        <Weather
          cityName={weatherData.city}
          country={weatherData.country}
          temp={weatherData.temp}
          tempMax={weatherData.tempMax}
          tempMin={weatherData.tempMin}
          description={weatherData.description}
          icon={weatherData.icon}
        />

        <div className='conteiner-cards'>
          {weatherDays.days.map((day, i) => <Cards day={day} key={i} />)}
        </div>

      </div>
    </div>
  );
}

export default App;
