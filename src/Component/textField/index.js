import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Input } from '@material-ui/core';
import './styles.scss'

const TextField = (props) => {
    const { label, placeHolder, value, type, onTextChange, error } = props
    const handleChange = (event) => {
        const currentValue = event.target.value
        onTextChange(currentValue)
    }
    return (
        <div className="TextField">
            <div className="full-width">
                <div className="label">
                    {label}
                </div>
                <input
                    className="input"
                    placeholder={placeHolder}
                    value={value}
                    onChange={handleChange}
                    type={type}
                    {...props}
                />
                <div className = "errorMessage">{error}</div>
            </div>
        </div>
    )
}
TextField.propTypes = {
    label: PropTypes.string,
    placeHolder: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string = "text",
    onTextChange: (value) => { }
}

export default TextField;