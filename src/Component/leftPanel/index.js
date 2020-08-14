import React from "react";
import './styles.scss'
import { Divider } from "@material-ui/core";
import { Redirect } from "react-router-dom";

const LeftPanel = () => {
    return (
        <div className="leftPanel">
            <div className='left'> <ul className="LeftSideBar__LeftSection__menuWrapper">
                <li>
                    <a href="/">Manage Users <Redirect to= "/"/></a>
                </li>
                <Divider />
                <li>
                    <a href="#manageListing">Manage Listing</a>
                </li>
                <Divider />
                <li>
                    <a href="#roles"> Roles</a>
                </li>
                <Divider />
            </ul></div>
        </div>
    )
}

export default LeftPanel;

