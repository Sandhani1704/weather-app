import React from 'react';

function minMaxTemp(min, max) {
    return (
        <h3>
            <span className='px-4'>{min}&deg;</span>
            <span className='px-4'>{max}&deg;</span>
        </h3>
    )
}

const Weather = () => {
    return (
        <div className='conteiner'>
            <div className='cards'>
                <h1>London</h1>
                <h5 className='py-4'>
                    <i class="wi wi-day-sunny" display-3></i>
                </h5>
                <h2 className='py-2'>25&deg;</h2>
                {minMaxTemp(28, 15)}

            </div>

        </div>
    )
}

export default Weather;