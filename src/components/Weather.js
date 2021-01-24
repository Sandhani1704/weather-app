import React from 'react';
import moment from 'moment';


const Weather = (props) => {
    
    return (
        <div className='conteiner'>
            <p>{moment().format('LT')}</p>
            <div className='cards'>
                <h1>{props.cityName}</h1>
                <h5 className='py-4'>
                    <i className={`wi ${props.icon} display-1`}></i>
                </h5>
                {props.temp ? (
                    <h2 className='py-2'>{props.temp}&deg;</h2>
                ) : null}
                
                <p className='py-3'>{props.description}</p>
            </div>

        </div>
    )
}

export default Weather;