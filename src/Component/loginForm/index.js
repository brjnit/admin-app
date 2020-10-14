import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import TextField from '../../Component/textField';
import './styles.scss'
import BasicButton from '../../Component/basicButton';
import { connect } from "react-redux";  
import {sendOTP, verifyOTP} from '../../Redux/actions/AuthActions'
import {Redirect} from 'react-router-dom'

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showOTPInput, setShowOTPInput] = useState(false);
    const configUserNameField = {
        label: "MOBILE NUMBER",
        placeHolder: "",
        value: username,
        maxLength :10,
        onTextChange: (value) => {
            setUsername(value)
            isLoginEnable()
        }
    }
    const configPasswordField = {
        label: "OTP",
        placeHolder: "",
        value: password,
        type: "password",
        maxLength : 4,
        onTextChange: (value) => {
            setPassword(value)
            isLoginEnable()
        }
    }
    const isLoginEnable = () => {
        console.log("username ", username, "length ", username.length, "showOTPInput ", showOTPInput)
        let isEnabled = false;
        if(!showOTPInput && username != '' && username.length == 10)
            isEnabled = true
        else if(showOTPInput && password != '' && password.length == 4) 
            isEnabled = true

        return isEnabled
    }

    const handleLoginTap = () => {
        console.log(username, password)
        props.verifyOTP(username, password)
    }

    const sendOTP = () =>{
        setShowOTPInput(true)
        props.sendOTP(username)
    }

    let configLoginButton = {
        buttonText: showOTPInput?"VERIFY OTP":"LOGIN",
        isEnable: isLoginEnable(),
        emitEvent: showOTPInput?handleLoginTap:sendOTP
    }
    console.log("[loginform.js] props ", props)
    return (
        <div className="loginForm">
            {props.isAuthenticated&& <Redirect to = "/home"/>}
            <div className="login-header">DG Manager</div>
            <div className="formComponent">
                <TextField {...configUserNameField} />
                {showOTPInput && <TextField {...configPasswordField} />}
            </div>
                <BasicButton  {...configLoginButton} />
            
        </div>
    )
}
LoginForm.propTypes = {
    placeHolder: PropTypes.string,
}

const mapStateToProps = state =>{
    return {
        isAuthenticated : state.auth.isAuthenticated
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        sendOTP : (mobNum) => dispatch(sendOTP(mobNum)),
        verifyOTP : (mobNum, OTP) => dispatch(verifyOTP(mobNum, OTP))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);