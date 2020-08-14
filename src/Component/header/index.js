import React from "react";
import PropTypes from 'prop-types';
import { ArrowBack, Menu, ExitToApp} from '@material-ui/icons';
import './styles.scss'
import Logo from '../../Assets/DailyGetLogo.png'


const Header = (props) => {
    const {title, isBack, emitEvent, isLoggedIn, logoutEvent} = props
    const submitEvent = () => {
        console.log("event triggered")
        emitEvent();
    }

    const handleLogout = () => {
        console.log("event handleLogout triggered")
        logoutEvent();
    }

    return(
        <header data-test="headerComponent">
             <div><img className = 'logo' src = {Logo}/></div>
            <div className = "button" onClick = {submitEvent}>
            {isBack ? <ArrowBack/> : <Menu/>
            }
           
            </div>
            <div className = "wrap">
                {title} 
                </div> 
                <div className = "button" onClick = {handleLogout}>
            {isLoggedIn ? <ExitToApp/> : null
            } 
                </div>
        </header>
    )
}
Header.propTypes = {
    title: PropTypes.string,
    isBack: PropTypes.bool,
    emitEvent: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    logoutEvent: PropTypes.func
}

export default Header;