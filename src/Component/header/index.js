import React from "react";
import PropTypes from 'prop-types';
import { ArrowBack, Menu, ExitToApp } from '@material-ui/icons';
import './styles.scss'
import Logo from '../../Assets/DailyGetLogo.png'
import DropDown from '../dropDown'


const Header = (props) => {
    const { title, isBack, emitEvent, isLoggedIn, logoutEvent, locations, selectedLocation, handleLocationSelection } = props
    const submitEvent = () => {
        console.log("event triggered")
        emitEvent();
    }

    const configLocationSelect = {
        //label: "Company",
        list: locations,
        classes : {root:'root-custom'},
        showLable : false,
        value : selectedLocation,
        emitEvent: (value) => {
            //setCompany(value)
            console.log("[Header.js] campus :: ",value)
            handleLocationSelection(value)
        }
    }

    const handleLogout = () => {
        console.log("event handleLogout triggered")
        logoutEvent();
    }

    return (
        <header data-test="headerComponent">
            <div className="button" onClick={submitEvent}>
                {isBack ? <ArrowBack style = {{color:'white', fontSize : 40}}/> : <Menu style = {{color:'white', fontSize : 40}}/>
                }
            </div>
            <div className = "headerText">DailyGET Admin Console</div>
            <div class = "wrap">
            <DropDown {...configLocationSelect} />
            </div>
            <div className="button" onClick={handleLogout}>
                {isLoggedIn ? <ExitToApp style = {{color:'white', fontSize : 30}}/> : null
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
    logoutEvent: PropTypes.func,
    selectedLocation : PropTypes.string,
    locations : PropTypes.object,
    handleLocationSelection : PropTypes.func
}

export default Header;