import React from 'react';

function minMaxTemp(min, max) {
    return (
        <h3>
            <span className='px-4'>{min}&deg;</span>
            <span className='px-4'>{max}&deg;</span>
        </h3>
    )
}

const Weather = (props) => {
    return (
        <div className='conteiner'>
            <div className='cards'>
                <h1>{props.city}, {props.country}</h1>
                <h5 className='py-4'>
                    <i className={`wi ${props.icon} display-1`}></i>
                </h5>
                {/* <h2 className='py-2'>25&deg;</h2> */}
                <h2 className='py-2'>{props.temp}&deg;</h2>
                {minMaxTemp(props.tempMin, props.tempMax)}
                <p className='py-3'>{props.description}</p>
            </div>

        </div>
    )
}

export default Weather;