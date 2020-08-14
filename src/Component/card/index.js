import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import './styles.scss'
import { AccountBalance } from "@material-ui/icons";
const Card = (props) => {
    const { title, subTitle, value } = props
 
    return (
        <div className="card">
             <div className="title">
             {title}
            </div> 
            <div className="subTitle">
             {subTitle}
            </div> 
            <div className="subTitle">
            <div className="bottom">
             <div>{value}</div>
             <AccountBalance/>
            </div> 
            {/* <img className="right"  > </img> */}
             
            </div> 
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    value: PropTypes.string
}

export default Card;