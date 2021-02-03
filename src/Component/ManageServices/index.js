import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import TextField from '../../Component/textField';
import './styles.scss'
import BasicButton from "../basicButton";
import Footer from "../footer";
import {connect} from 'react-redux'
import DropDown from '../dropDown'
import {addStaff} from '../../Redux/actions/UserActions'
import {getPartnerInGroup, selectService} from '../../Redux/actions/AccountActions'
import ServiceList from '../ServiceList'
import {withRouter} from 'react-router-dom'


const ManageServices = (props) => {
    const [userName, setUserName] = useState('')
    const [role, setRole] = useState('')
    const [emailId, setEmailId] = useState('')
    const [mobileNum, setMobileNumber] = useState('')

    useEffect(() => {
        props.getPartnerInGroup(props.selectedLocation.listId)
    },[props.selectedLocation]);

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

    const serviceSelectionHandler = (id) => {
        console.log("selectedService id ", id)
        const selectedService = props.services.find((service) => {
            if(service.id == id) {
              return service
            }
        })
        props.selectService(selectedService);
        props.history.push({ to:'/home', hash:"ServiceDetails"})
    }

    console.log("[ManageServices.js] props :: ",props)
    
    return (
        <div className='add-user'>
            <ServiceList
                data = {props.services}
                serviceSelectionHandler = {serviceSelectionHandler}
            />

        </div>
    )
}
ManageServices.propTypes = {
    input: PropTypes.object,
    handleAddUser: () => { }
}

const mapStateToProps = state =>{
    return {
        services :  state.account.services,
        selectedLocation: state.account.selectedLocation
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        getPartnerInGroup : (partnerId) => dispatch(getPartnerInGroup(partnerId)),
        selectService : (selectedService) => dispatch (selectService(selectedService))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageServices));