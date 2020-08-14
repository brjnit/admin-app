import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import TextField from '../../Component/textField';

import './styles.scss'
import BasicButton from "../basicButton";
import Footer from "../footer";

const AddUser = (props) => {
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
    
    const configAddUser = {
        buttonText: "Add User",
        emitEvent: () => {}
    }


    const configUserNameField = {
        label: "User name:",
        placeHolder: "Enter your user name",
        value: '',
        type: "text",
        onTextChange: (value) => {}
    }
    const configUserRoleField = {
        label: "User Role:",
        placeHolder: "Enter your user name",
        value: '',
        type: "text",
        onTextChange: (value) => {}
    }
    const configMobileField = {
        label: "Mobile:",
        placeHolder: "Enter your user name",
        value: '',
        type: "text",
        onTextChange: (value) => {}
    }
    

    return (
        <section className='add-user'>
        <TextField {...configUserNameField}/>
        <TextField {...configUserRoleField}/>
        <TextField {...configMobileField}/>
        <Footer>
                            <BasicButton  {...configAddUser} />
            </Footer>
            
          </section>
    )
}
AddUser.propTypes = {
    placeHolder: PropTypes.string,
    value: PropTypes.string,
    onTextChange: (value) => {}
}

export default AddUser;