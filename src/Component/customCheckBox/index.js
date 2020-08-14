import React, { useState } from "react";
import PropTypes from 'prop-types';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import './styles.scss'

const CustomCheckBox = (props) => {
    const { data, emitEvent } = props
    const itemSelected = []
    const onCheck = (event) => {
        console.log("event.target.checked ", event.target.checked)
        itemSelected.push(event.target.value)
        emitEvent(itemSelected);
    }

    const renderCheckBox = () => {
        return <FormGroup aria-label="position"> {data.map((item) => {
            const { id, name, checked } = item
            if (checked) {itemSelected.push(id)}

            return (
                <FormControlLabel
                    value={id}
                    //checked = {checked}
                    control={<Checkbox color="primary"  onChange = {onCheck}/>}
                    label={name}
                    labelPlacement={name} 
                />
            )
        })}
        </FormGroup>
    }
    return (

        <FormControl component="fieldset" variant = "filled" fullWidth = "true" color = "primary">
            <FormLabel component="legend">Access Label</FormLabel>
                {data != null && data.length > 0 && renderCheckBox()}    
        </FormControl>
    )
}
CustomCheckBox.propTypes = {
    data: PropTypes.array,
    emitEvent: PropTypes.func
}

export default CustomCheckBox;
