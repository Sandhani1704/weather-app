import React from 'react';
import moment from 'moment';
import './Weather.css';


const Weather = (props) => {
    const icon = `http://openweathermap.org/img/wn/${props.icon}@2x.png`;

    return (
        <div className='conteiner'>
            { props.cityName && <p className='card__weather-time'>Сейчас {moment().format('LT')}</p>}
            <div className='cards'>
                <h1 className='card_city-name'>{props.cityName}</h1>
                {props.cityName && <img className='weather__image' src={icon} alt={props.description}></img>}

                {props.temp ? (
                    <p className='weather__temp'>{props.temp}&deg;</p>
                ) : null}
                <p className='card__weather-description'>{props.description}</p>
            </div>

        </div>
    )
}

export default Weather;