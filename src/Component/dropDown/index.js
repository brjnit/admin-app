import React, { useState } from "react";
import PropTypes from 'prop-types';
import './styles.scss'
import { Select,FormControl,MenuItem, InputLabel, Input } from "@material-ui/core";

const DropDown = (props) => {
    const {label, list,types, emitEvent} = props
    const [selectedValue, setSelection ] = useState(label)
    const handleChange = (event) => {
        emitEvent(event.target.value);
        setSelection(event.target.value)
    }
    return(
        <FormControl className="form-group">
           <InputLabel htmlFor="select-helper">{label}</InputLabel>
            <Select
              variant="outlined"
              value={selectedValue}
              onChange={handleChange}
              input={<Input name={label} id="select-helper" />}
            >
              {list.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
    )
}
DropDown.propTypes = {
    label: PropTypes.string,
    list: PropTypes.array,
    emitEvent: PropTypes.func
}

export default DropDown;