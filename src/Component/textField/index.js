import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { Input } from '@material-ui/core';
import './styles.scss'

const TextField = (props) => {
    const { label, placeHolder, value, type, onTextChange } = props
    const [textValue, setTextValue] = useState('')
    const handleChange = (event) => {
        const currentValue = event.target.value
        setTextValue(currentValue)
        onTextChange(textValue)
    }
    useEffect(() => {
        setTextValue(value)
    }, []);
    
    return (
        <div className="TextField">
            <div className="full-width">
             <div className="label">
             {label}
            </div>
            
             <input 
             className="input"
            placeholder = {placeHolder}
            value={textValue}
            onChange={handleChange}
            type= {type}

            />
            </div>
        </div>
    )
}
TextField.propTypes = {
    label: PropTypes.string,
    placeHolder: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string = "text",
    onTextChange: (value) => {}
}

export default TextField;