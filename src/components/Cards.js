import React from 'react';
import moment from 'moment';
import russianLocale from 'moment/locale/ru'

moment.updateLocale('ru', russianLocale);
// import './Cards.css';

function minMaxTemp(min, max) {
    if (max && min) {
        return (
            <h3>
                <span className='px-4'>{Math.round(min)}&deg;</span>
                <span className='px-4'>{Math.round(max)}&deg;</span>
            </h3>
        )
    }
}

const Cards = (props) => {
    const icon = `http://openweathermap.org/img/wn/${props.day.weather[0].icon}@2x.png`;
    const getWeekDay = props.day.dt_txt;
    // console.log(getWeekDay)
    
    // const weekDay = props.day.dt_txt

        return (
        <div className='card-conteiner'>
            {/* {newDate} */}
            <p>{moment(getWeekDay).format('dddd')}</p>
            <p>{moment(getWeekDay).format('MMM Do YY')}</p>
                        
            {/* <h1>{props.day.weather[0].description}</h1> */}
            <img src={icon}></img>
            {/* <p className='py-4'>
                <i className={`wi ${props.day.weather[0].icon} display-1`}></i>
            </p> */}
            {props.day.main.temp ? (
                <h2 className='py-2'>{Math.round(props.day.main.temp)}&deg;</h2>
            ) : null}
            {minMaxTemp(props.day.main.temp_max, props.day.main.temp_max)}
            <p className='py-3'>{props.day.weather[0].description}</p>



        </div>
    )
}

export default Cards;