import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import TextField from '../textField';
import './styles.scss'
import BasicButton from "../basicButton";
import Footer from "../footer";
import {connect} from 'react-redux'
import DropDown from '../dropDown'
import {addNewUser} from '../../Redux/actions/UserActions'
import {uploadFile} from '../../Network/UploadFile/UploadFile'
import { v4 as uuidv4 } from 'uuid';
import ConfirmationDialogue from '../confirmationDialogue'


const AddCustomer = (props) => {
    const [userName, setUserName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [mobileNum, setMobileNumber] = useState('')
    const [campus, setCampus] = useState('')
    const [company, setCompany] = useState('')
    const [image, setImage] = useState('')
    const[showDialogue, setShowDialogue] = useState(false)

    const isButtonEnable = () => {
        console.log("[addCustomer.js] values :: ", userName, campus, mobileNum, company)
        return userName != '' && campus != '' && mobileNum != ''  && company != '' && image!=''
    }

    const handleAddStaff = () => {
        setShowDialogue(false)
        props.addNewUser(userName, mobileNum, campus, emailId, company)
    }

    const configAddUser = {
        buttonText: "SAVE",
        isEnable: isButtonEnable(),
        emitEvent: () => setShowDialogue(true)
    }

    const configUserNameField = {
        label: "Name:",
        placeholder: "Enter name",
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


    

    const getDataForDropDownCampus = () =>{
        const  options = props.configurationList["divyasree_campus"]
        console.log("[Report.js] options :: ", options)
        let data = []
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
        let data = []
        if (options != null && options != undefined) {
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

    const configCompnaySelect = {
        label: "Company",
        list: getDataForDropDownCompany(),
        emitEvent: (value) => {
            setCompany(value)
        }
    }
    const onFileChange = event => { 
     
        // Update the state 
        if (event.target.files && event.target.files[0]) {
            uploadFile(event.target.files[0],uuidv4() ,"messagePhoto").then((uploadResponse)=>{
                if(uploadResponse.status == 200){
                    console.log("uploadResponse", uploadResponse)
                    setImage(uploadResponse.data.fileURL)   
                }
            })
          } 
      }; 
      
    return (
        <section className='add-user'>
            <div className='header'>Enter User Details</div>
            <div className = "profilePic">
            <div style={{marginBottom : 15}}>Select Profile Picture</div>
            <img id="target" src={image} style = {{maxWidth : 200, maxHeight : 200}}/>
            <input type="file" onChange={onFileChange} accept="image/png, image/jpeg"  className ="imageSelect"/> 
            </div>

            <TextField {...configUserNameField} />
            <div style={{height:5}}></div>
            <TextField {...configMobileField} />
            <div style={{height:5}}></div>
            <TextField {...configEmailId} />
            <div style={{height:10}}></div>
            <DropDown {...configCampusSelect} />
            <div style={{height:15}}></div>
            <DropDown {...configCompnaySelect} />
            <Footer>
                <BasicButton  {...configAddUser} />
            </Footer>
            <ConfirmationDialogue 
                open = {showDialogue}
                handleNo = {() => setShowDialogue(false)}
                handleYes = {handleAddStaff}
                body = "Are you sure you want to register this user?"
                title = "CONFIRM"
            />

        </section>
    )
}
AddCustomer.propTypes = {
    input: PropTypes.object,
    handleAddUser: () => { }
}

const mapStateToProps = state =>{
    return {
        partnerId :  state.account.selectedLocation.id,
        configurationList: state.configuration.configurationList,
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        addNewUser : (name, phoneNumber, campus, emailId, companyName, profilePicLink) => dispatch(addNewUser(name, phoneNumber, campus, emailId, companyName, profilePicLink))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);