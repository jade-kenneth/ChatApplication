import React from 'react'

import './scss/authStyle.css';

const Input = ({name, id, autoFocus, handleChange, value, autoComplete, placeholder, type}) => {
    return (
        <div className="authInput">
            <label className="descriptionLabel" htmlFor={id}>{id}</label>
                <input required id={id} autoFocus={autoFocus} value={value} type={type} autoComplete={autoComplete} placeholder={placeholder} name={name} onChange={handleChange}/>
        </div>
    )
}

export default Input
