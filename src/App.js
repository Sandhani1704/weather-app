import './App.css';
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'weather-icons/css/weather-icons.css'
import Weather from './components/Weather'
import Cards from './components/Cards'
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
    // icon: undefined,
  });

  const [days, setDays] = React.useState({ days: [] })

  const [weatherIcon, setWeatherIcon] = React.useState({
    Thunderstorm: 'wi-thunderstorm',
    Drizzle: 'wi-sleet',
    Rain: 'wi-storm-showers',
    Snow: 'wi-snow',
    Atmosphere: 'wi-fog',
    Clear: 'wi-day-sunny',
    Clouds: 'wi-day-fog',
  });


  // const [country, setCountry] = React.useState('');

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

  // const calcCelsius = (temp) => {
  //   let cell = Math.floor(temp - 273, 15)
  //   return cell;
  // }

  // React.useEffect(() => {
  const getWeather = async (e) => {
    e.preventDefault()
    const location = e.target.elements.city.value
    console.log(location)
    if (location) {
      const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&lang=ru&units=metric&APPID=${API_KEY}`)
      const response = await apiCall.json()
      console.log(response)
      // const dailyData = response.list.slice(0, 40);

      const dailyData = response.list.filter(reading => reading.dt_txt.includes("18:00:00"))

      // const newData = response.list.reduce((acc, item) => {
      //   const day = item.dt_txt.split(' ')[0]; // Дата как ключ
      //   if (!acc[day]) {  // если у нас нет такого ключа, то создаем
      //     acc[day] = [];
      //   }
      //   acc[day].push(item.main.temp)
      //   // добавляем температуру
      //   acc[day].push(item.weather[0].icon)
      //   return acc
      // }, {});

      // console.log(newData)
      // const temp = [];
      // for (let item in newData) {
      //   const avgTemp = Math.round(newData[item].reduce((acc, cur) => {
      //     return acc + cur
      //   }, 0) / newData[item].length) // Складываем температуру, делим на количество элементов, округляем и добавляем в новый объект
      //   temp.push({
      //     day: item,
      //     avgTemp: avgTemp,
      //     // weather: item
      //   })
      // }

      // console.log(temp)



      setDays({ days: dailyData })
      // console.log(newData);
      getWeatherIcon(weatherIcon, response.list[0].weather[0].id);
      // console.log(getWeatherIcon(weatherIcon, response.weather[0].id))
      setWeatherData({
        // city: `${response.name}, ${response.sys.country}`,
        // country: response.sys.country,
        // temp: calcCelsius(response.main.temp),
        // tempMax: calcCelsius(response.main.temp_min),
        // tempMin: calcCelsius(response.main.temp_max),
        // description: response.weather[0].description,
        city: `${response.city.name}, ${response.city.country}`,
        country: response.city.country,
        //temp: calcCelsius(response.list[0].main.temp),
        temp: Math.round(response.list[0].main.temp),
        tempMax: Math.round(response.list[0].main.temp_min),
        tempMin: Math.round(response.list[0].main.temp_max),
        description: response.list[0].weather[0].description,
        // icon: getWeatherIcon(weatherIcon, response.weather[0].id)
      });
      // console.log(setWeatherData.icon)

      // console.log(getWeatherIcon(weatherIcon, response.weather[0].id))
    } else console.error();
  }
  //   getWeather()
  // }, [getWeather()]);


  return (
    <div className="App">
      <Form getWeather={getWeather} />
      <Weather
        cityName={weatherData.city}
        country={weatherData.country}
        temp={weatherData.temp}
        tempMax={weatherData.tempMax}
        tempMin={weatherData.tempMin}
        description={weatherData.description}
        icon={weatherIcon.icon}
      />
      <h5 className='city-name'>{weatherData.city}</h5>
      <div className='conteiner-cards'>

        {days.days.map((day, i) => <Cards day={day} key={i} />)}
      </div>

    </div>
  );
}

export default App;
