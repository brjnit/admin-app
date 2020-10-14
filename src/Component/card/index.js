import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import './styles.scss'
import CallReceivedIcon from '@material-ui/icons/CallReceived';
const Card = (props) => {
    const { title, subTitle, value } = props

    return (
        <div className="card">
            <div className="title">
                {title}
                <CallReceivedIcon />
            </div>
            <div className="subTitle">
                {value}
            </div>
            <div>
                <div className="bottom">
                </div>
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