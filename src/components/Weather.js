import React from 'react';
import moment from 'moment';
import './Weather.css';

// function minMaxTemp(min, max) {
//     if (max && min) {
//         return (
//             <h3>
//                 <span className='px-4'>{min}&deg;</span>
//                 <span className='px-4'>{max}&deg;</span>
//             </h3>
//         )
//     }
// }

const Weather = (props) => {
    const icon = `http://openweathermap.org/img/wn/${props.icon}@2x.png`;
    console.log(icon)
    return (
        <div className='conteiner'>
            { props.cityName && <p>Сейчас {moment().format('LT')}</p>}
            <div className='cards'>
                <h1>{props.cityName}</h1>
                <img className='weather__image' src={icon}></img>

                {props.temp ? (
                    <p className='weather__temp'>{props.temp}&deg;</p>
                ) : null}
                <p className='py-3'>{props.description}</p>
            </div>

        </div>
    )
}

export default Weather;