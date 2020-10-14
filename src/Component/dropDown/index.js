import React, { useState } from "react";
import PropTypes from 'prop-types';
import './styles.scss'
import { Select,FormControl,MenuItem, InputLabel, Input } from "@material-ui/core";

const DropDown = (props) => {
    let {label, list, types, emitEvent, showLable, value} = props
    
    const handleChange = (event) => {
        emitEvent(event.target.value);
        
    }
    console.log("[DropDown.js] value ", value)
    if(showLable==undefined)
      showLable = true
    return(
        <FormControl className="form-group">
           {showLable&&<InputLabel htmlFor="select-helper">{label}</InputLabel>}
            <Select
              //variant="outlined"
              value={value}
              onChange={handleChange}
              input={<Input />}
            >
              {list.map((item) => (
                <MenuItem value={item} key={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
    )
}
DropDown.propTypes = {
    label: PropTypes.string,
    list: PropTypes.array,
    emitEvent: PropTypes.func,
    showLable : PropTypes.bool,
    classes : PropTypes.object,
    value : PropTypes.string
}

export default DropDown;