import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import TextField from '../../Component/textField';
import './styles.scss'
import Footer from '../../Component/footer';
import BasicButton from '../../Component/basicButton';
import { useDispatch } from "react-redux";

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const configUserNameField = {
        label: "User Name :",
        placeHolder: "Enter User Name",
        value: '',
        onTextChange: (value) => {
            const isValid = /^([a-zA-Z0-9]{4,20})$/.test(value)
            if (isValid) {
                setUsername(value)
            } else {
                setUsername('')
            }
            isLoginEnable()
        }
    }
    const configPasswordField = {
        label: "Password :",
        placeHolder: "Enter your password",
        value: '',
        type: "password",
        onTextChange: (value) => {
            const isValid = /^([a-zA-Z0-9._]{4,20})$/.test(value)
            if (isValid) {
                setPassword(value)
            } else {
                setPassword('')
            }
            isLoginEnable()
        }
    }
    const isLoginEnable = () => {
        console.log("username ", username, "password ", password)
        return  username!='' && password!=''
    }

    const handleLoginTap = () => {
        console.log(username, password)
        //dispatch(onLogin(username, password))
    }
    let configLoginButton = {
        buttonText: "Login",
        isEnable: isLoginEnable(),
        emitEvent: handleLoginTap
    }

    const configRegisterButton = {
        buttonText: "Register",
        isEnable: true,
        emitEvent: () => { }
    }

    useEffect(() => {
       // configLoginButton.isEnable = isLoginEnable()
        
    }, []);
    
    return (
        <div className="loginForm">
            <div className = "login-header">Login</div>
            <div className = "formComponent"> 
            <TextField {...configUserNameField}/>
            <TextField {...configPasswordField}/>
            <div className = "forgot-password" onClick = {() => {}}>Forgot your password?</div>
            </div>
            <Footer>
                    <BasicButton  {...configLoginButton} />
            </Footer>

            <Footer>
                    <BasicButton  {...configRegisterButton} />
            </Footer>
        </div>
    )
}
LoginForm.propTypes = {
    placeHolder: PropTypes.string,
}

export default LoginForm;