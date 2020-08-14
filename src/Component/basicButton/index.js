import React from "react";
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import './styles.scss'

const BasicButton = (props) => {
    const {buttonText,isEnable, emitEvent} = props
    const handleEvent = () => {
        emitEvent();
    }
    return(
        <button className = "BasicButton" disabled = {!isEnable} onClick = {handleEvent} data-test="buttonComponent">
            {console.log("button Enable" ,isEnable)}
            {buttonText}
        </button>
    )
}
BasicButton.propTypes = {
    buttonText: PropTypes.string,
    isEnable: PropTypes.bool = true,
    emitEvent: PropTypes.func
}

export default BasicButton;