import React from 'react';
import "./Form.css";

function Form(props) {
    return (
        <div className='form-conteiner conteiner h-100'>
            <form className='search-form' onSubmit={props.getWeather}>
                {/* <input
                    type="text"
                    className="form-control col-md-3 offset-md-2"
                    placeholder="City"
                    name="city"
                    autoComplete="off"
                /> */}

                <input
                    type="text"
                    className="search-form__input"
                    placeholder="City"
                    name="city"
                // autoComplete="off"
                />
                {/* <input
                    type="text"
                    className="form-control col-md-3"
                    placeholder="Country"
                    name="country"
                    autoComplete="off"
                /> */}
                {/* <button className="btn btn-warning col-md-3 mt-md-0 mt-2 text-md-left">Get Weather</button> */}
                <button className="search-form__button-find">Get Weather</button>

            </form>

        </div>
    )
}

export default Form;