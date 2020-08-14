import React from "react";
import './styles.scss'
import PropTypes from 'prop-types';
import Header from "../header";
import SideDrawer from "../sideDrawer";

const Toolbar = (props) => {
    //const {title} = props
    const configHeader = {
        title: "Login",
        isBack: false,
        emitEvent: () => {}
      }
    return(
        <div>
        <div className="title">
        
               <Header {...configHeader}/>
            {props.children}
        </div>
        {/* <SideDrawer/> */}
        </div>
    )
}

Toolbar.propTypes = {
    title: PropTypes.string,
    isBack: PropTypes.bool,
    emitEvent: PropTypes.func
}
export default Toolbar;