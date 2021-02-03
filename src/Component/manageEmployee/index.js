import React, { useState } from "react";
import PropTypes from 'prop-types';
import DropDown from '../dropDown'
import './styles.scss'
import Wrapper from "../../hoc/Wrapper";
import BasicButton from "../basicButton";
import {  connect } from "react-redux";
import TextField from '../textField';
import {getConsumerByPhone} from '../../Redux/actions/UserActions'
import EditCustomer from '../../Component/EditCustomer'
import {withRouter} from 'react-router-dom'
import Loader from '../loader'



const ManageEmployee = (props) => {
    const [campus, setCampus] = useState('')
    const [company, setCompany] = useState('')
    const [mobNum, setMobNum] = useState('')
    const [showMobileField, setShowMobileField] = useState(false) 
    
    const handleAddEmployee = () =>{
        props.history.push({to:'/home',hash :"AddUser"})
    }

    const handleEditEmployee = () =>{
        setShowMobileField(true);
    }


    const configEditEmployee = {
        buttonText: "EDIT EMPLOYEE",
        isEnable: true,
        emitEvent: handleEditEmployee
    }

    const configAddEmployee = {
        buttonText: "REGISTER EMPLOYEE",
        isEnable: true,
        emitEvent: handleAddEmployee
    }

    const getDataForDropDownCampus = () =>{
        const  options = props.configurationList["divyasree_campus"]
        console.log("[Report.js] options :: ", options)
        let data = ['All']
        if (options != null && options != undefined) {
            let optionsArray = Object.keys(options)
            console.log("[Report.js] optionsArray :: ", optionsArray)
            for (var i = 0; i < optionsArray.length; i++) {
                data.push(optionsArray[i])
            }
            console.log("[Report.js] defaultLocation :: ",{'name':optionsArray[0], 'id': options[optionsArray[0]].id})
        }
        return data;
    }

    const getDataForDropDownCompany = () =>{
        const  options = props.configurationList['divaysree_company_list']
        console.log("[Report.js] options :: ", options)
        let data = ['All']
        if(options!=null && options != undefined){
            const companies = options[campus]
            console.log("[Report.js] companies :: ", companies)

            if(companies != null && companies != undefined){
                let optionsArray = Object.keys(companies)
                
                for(var i = 0; i < optionsArray.length; i++){
                    data.push(optionsArray[i] )
                }
            }
        }
        return data;
    }

    const configCampusSelect = {
        label: "Campus",
        list: getDataForDropDownCampus(),
        emitEvent: (value) => {
            setCampus(value)
        }
    }

    const configCompanySelect = {
        label: "Company",
        list: getDataForDropDownCompany(),
        emitEvent: (value) => {
            setCompany(value)
        }
    }

   
    const checkSearchButton = () => {
        console.log("[ManageEmployye.js] mobNum ", mobNum)
        const regEx =  /^\d{10}$/
        console.log("[ManageEmployye.js] mobNum ", regEx.test(mobNum))
        return regEx.test(mobNum)
    }

    const handleSearchEmployee = () =>{
        props.getConsumerByPhone(mobNum)
    }

    const configSearchEmployee = {
        buttonText: "SEARCH",
        isEnable: checkSearchButton(),
        emitEvent: handleSearchEmployee
    }

    const configMobileNumField = {
        label: "Search Employee",
        placeHolder: "Enter employee mobile number",
        maxLength : 10,
        value: mobNum,
        error : props.manageUser.fetchError.errorMessage,
        onTextChange: (value) => {
            setMobNum(value)
        }
    }
    return (
        <Wrapper>
            <div className = 'header'>Manage Employee</div> 
            <div className = 'manageOption'>
                    <div >
                        <BasicButton {...configAddEmployee}/>
                    </div>
                    <div style = {{marginLeft : 25}}>
                        <BasicButton {...configEditEmployee}/>
                    </div>
                    
            </div>
            {showMobileField && <div className = 'bottomAction'>
                    <TextField {...configMobileNumField} />
                    <div className ="addUser">
                        <BasicButton {...configSearchEmployee}/>
                    </div>
                    <div style = {{marginLeft : 10}}>
                    {props.manageUser.fetchStart&&<Loader/>}
                    </div>
            </div>}
            {props.userDtls.detailsAvailable&&<EditCustomer usrDtls = {props.userDtls}/>}
        </Wrapper>
    )
}
ManageEmployee.propTypes = {
    data: PropTypes.array
}


const mapStateToProps = state => {
    return {
        configurationList: state.configuration.configurationList,
        staffDtls : state.auth.staffDtls,
        userDtls : state.user.manageUser.selectedUserDtls,
        manageUser : state.user.manageUser
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        getConsumerByPhone : (phoneNumber) => dispatch(getConsumerByPhone(phoneNumber))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageEmployee))