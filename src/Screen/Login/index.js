import React, { Component } from 'react'
import './styles.scss'
import Header from '../../Component/header';
import Conatiner from '../../Component/conatiner';
import Wrapper from '../../hoc/Wrapper';
import TextField from '../../Component/textField';
import Title from '../../Component/title';
import SideDrawer from '../../Component/sideDrawer';
import Toolbar from '../../Component/toolBar';
import DropDown from '../../Component/dropDown';
import LoginForm from '../../Component/loginForm';


class Login extends Component {
   
   
    render() {
        
        return (
            <Wrapper>
                <div className='Login'>
                    
                    <LoginForm />
                </div>
            </Wrapper>
        )
    }
}

Login.propTypes = {

}

export default Login;