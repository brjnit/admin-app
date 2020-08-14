import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import TextField from '../textField';

import './styles.scss'
import DropDown from "../dropDown";
import BasicButton from "../basicButton";
import CustomCheckBox from "../customCheckBox";

const AddRole = (props) => {
    const { placeHolder, value, onTextChange } = props
    const [textValue, setTextValue] = useState('')
    const handleChange = (event) => {
        const currentValue = event.target.value
        setTextValue(currentValue)
        onTextChange(textValue)
    }
    useEffect(() => {
        setTextValue(value)
    }, []);

    const configCreate = {
        buttonText: "Create",
        emitEvent: () => { }
    }
    const configCheckBox = {
        data: [{ id: "1", name: "Banner", checked: true }, { id: "2", name: "Edit Profile", checked: false }, { id: "3", name: "Add Staff", checked: false }],
        emitEvent: (itemSelected) => {
            console.log("itemSelected", itemSelected)
        }
    }

    const configRoleField = {
        label: "Role:",
        placeHolder: "Enter your user name",
        value: '',
        type: "text",
        onTextChange: (value) => { }
    }

    return (
        <div className='add-role'>
            <div className='header'>Add Role</div>
            <section>
                <TextField {...configRoleField} />
                <div> <CustomCheckBox {...configCheckBox} /></div>
            </section>
            {/* <div className='addUser'> <BasicButton {...configAddUser}/></div> */}
            <div className='addUser'> <BasicButton {...configCreate} /></div>
        </div>
    )
}
AddRole.propTypes = {
    // placeHolder: PropTypes.string,
    // value: PropTypes.string,
    // onTextChange: (value) => {}
}

export default AddRole;