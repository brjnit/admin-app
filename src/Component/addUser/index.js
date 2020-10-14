import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import TextField from '../../Component/textField';
import './styles.scss'
import BasicButton from "../basicButton";
import Footer from "../footer";
import {connect} from 'react-redux'
import DropDown from '../dropDown'
import {addStaff} from '../../Redux/actions/UserActions'

const AddUser = (props) => {
    const [userName, setUserName] = useState('')
    const [role, setRole] = useState('')
    const [emailId, setEmailId] = useState('')
    const [mobileNum, setMobileNumber] = useState('')

    const isButtonEnable = () => {
        return userName != '' && role != '' && mobileNum != ''
    }

    const handleAddStaff = () => {
        props.addStaff(props.partnerId, mobileNum,  userName, emailId, role)
    }

    const configAddUser = {
        buttonText: "ADD STAFF",
        isEnable: isButtonEnable(),
        emitEvent: handleAddStaff
    }

    const configUserNameField = {
        label: "Name:",
        placeholder: "Enter staff name",
        value: userName,
        type: "text",
        onTextChange: (value) => {
            setUserName(value)
        }
    }
    
    const configMobileField = {
        label: "Mobile Number:",
        placeholder: "Enter mobile number",
        value: mobileNum,
        maxLength : 10,
        type: "text",
        onTextChange: (value) => {
            setMobileNumber(value)
        }
    }

    const configEmailId = {
        label: "Email Id:",
        placeholder: "Enter email (Optional)",
        value: emailId,
        type: "text",
        onTextChange: (value) => {
            setEmailId(value)
        }
    }


    const configRoleSelect = {
        label: "Role",
        list: ['Admin', 'Security'],
        emitEvent: (value) => {
            setRole(value)
        }
    }


    return (
        <section className='add-user'>
            <div className='header'>Enter Staff Details</div>
            <TextField {...configUserNameField} />
            <TextField {...configMobileField} />
            <TextField {...configEmailId} />
            <DropDown {...configRoleSelect} />
            <Footer>
                <BasicButton  {...configAddUser} />
            </Footer>

        </section>
    )
}
AddUser.propTypes = {
    input: PropTypes.object,
    handleAddUser: () => { }
}

const mapStateToProps = state =>{
    return {
        partnerId :  state.account.selectedLocation.id
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        addStaff : (partnerId, phoneNumber, userName, emailId, role) => dispatch(addStaff(partnerId, phoneNumber, userName, emailId, role))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);