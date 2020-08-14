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
    constructor(props) {
        super(props);
    }
    render() {
        const configHeader = {
            title: "Login",
            isBack: false,
            emitEvent: () => { },
        }

        

        const configTextField = {
            placeHolder: "Enter User Name",
            value: "",
            onTextChange: (value) => {
                console.log("value", value)
            }
        }
        return (
            <Wrapper>
                <div className='Login'>
                    {/* <SideDrawer/> */}
                    {/* <Header {...configHeader} /> */}
                    {/* <Toolbar {...configHeader}/> */}
                    <LoginForm />
                    {/* <Conatiner>

                        
                        
                    </Conatiner> */}

                </div>
            </Wrapper>
        )
    }
}

Login.propTypes = {

}

export default Login;