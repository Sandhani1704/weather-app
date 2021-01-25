import React from 'react';
import moment from 'moment';
import russianLocale from 'moment/locale/ru'
import './Cards.css';

moment.updateLocale('ru', russianLocale);


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
    const icon = `http://openweathermap.org/img/wn/${props.day.icon}@2x.png`;
    const getWeekDay = props.day.date;

    return (
        <div className='card-conteiner'>

            <p>{moment(getWeekDay).format('dddd')}</p>
            <p>{moment(getWeekDay).format('MMM Do YY')}</p>

            <img src={icon}></img>

            {minMaxTemp(props.day.max_temp, props.day.min_temp)}

            <p className='py-3'>{props.day.description}</p>

        </div>
    )
}

export default Cards;