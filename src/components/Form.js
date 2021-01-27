import React from 'react';
import "./Form.css";

function Form(props) {
    return (
        <form className='search-form' onSubmit={props.getWeather}>
            <input
                type="text"
                className="search-form__input"
                placeholder="City"
                name="city"
            />
            <button className="search-form__button-find">Get Weather</button>
        </form>
    )
}

export default Form;