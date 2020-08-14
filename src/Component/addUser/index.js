import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import TextField from '../../Component/textField';

import './styles.scss'
import BasicButton from "../basicButton";
import Footer from "../footer";

const AddUser = (props) => {
    const { input, handleAddUser } = props
    const [userName, setUserName] = useState('')
    const [role, setRole] = useState('')
    const [mobileNo, setMobileNumber] = useState('')
    
    // const handleChange = (event) => {
    //     const currentValue = event.target.value
    //     setTextValue(currentValue)
    //     onTextChange(textValue)
    // }
    // useEffect(() => {
    //     setTextValue(value)
    // }, []);
    
    const isButtonEnable = () => {
        return userName!='' && role!='' && mobileNo
    }
    const configAddUser = {
        buttonText: "Add User",
        isEnable: isButtonEnable(),
        emitEvent: () => {}
    }


    const configUserNameField = {
        label: "User name:",
        placeHolder: "Enter your user name",
        value: input != null && input.userName != null ? input.userName : '',
        type: "text",
        onTextChange: (value) => {
            setUserName(value)
        }
    }
    const configUserRoleField = {
        label: "User Role:",
        placeHolder: "Enter your user name",
        value: input != null &&input.role != null ? input.role : '',
        type: "text",
        onTextChange: (value) => {
            setRole(value)
        }
    }
    const configMobileField = {
        label: "Mobile:",
        placeHolder: "Enter your user name",
        value: input != null &&input.mobileNo != null ? input.mobileNo : '',
        type: "text",
        onTextChange: (value) => {
            setMobileNumber(value)
        }
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
    input: PropTypes.object,
    handleAddUser: () => {}
}

export default AddUser;