import React from "react";
import PropTypes from 'prop-types';
import './styles.scss'

const DropDown = (props) => {
    const {label, type,types, emitEvent} = props
    const handleChange = () => {
        emitEvent();
    }
    return(
        <div className="form-group">
          <label htmlFor="type">{label}</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            className="form-control"
            value={type}
          >
            {types}
          </select>
        </div>
    )
}
DropDown.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    emitEvent: PropTypes.func
}

export default DropDown;