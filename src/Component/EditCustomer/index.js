import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import TextField from '../textField';
import './styles.scss'
import BasicButton from "../basicButton";
import Footer from "../footer";
import { connect } from 'react-redux'
import DropDown from '../dropDown'
import { editUser } from '../../Redux/actions/UserActions'
import { uploadFile } from '../../Network/UploadFile/UploadFile'
import { v4 as uuidv4 } from 'uuid';
import ConfirmationDialogue from '../confirmationDialogue'
import { colors } from "@material-ui/core";


const AddCustomer = (props) => {
    const [userName, setUserName] = useState(props.usrDtls.name)
    const [emailId, setEmailId] = useState(props.usrDtls.emailId)
    const [mobileNum, setMobileNumber] = useState(props.usrDtls.phoneNumber)
    const [campus, setCampus] = useState(props.usrDtls.campus)
    const [company, setCompany] = useState(props.usrDtls.companyName)
    const [image, setImage] = useState(props.usrDtls.profilePicLink)
    const [showDialogue, setShowDialogue] = useState(false)

    const isButtonEnable = () => {
        console.log("[EditCustomer.js] values :: ", userName, campus, mobileNum, company)
        return userName != '' && campus != '' && mobileNum != '' && company != '' && image != ''
    }

    const handleEditStaff = () => {
        setShowDialogue(false)
        props.editUser(props.usrDtls.id, userName, mobileNum, campus, emailId, company, image)
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
        maxLength: 10,
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




    const getDataForDropDownCampus = () => {
        const options = props.configurationList["divyasree_campus"]
        console.log("[Report.js] options :: ", options)
        let data = []
        if (options != null && options != undefined) {
            let optionsArray = Object.keys(options)
            console.log("[Report.js] optionsArray :: ", optionsArray)
            for (var i = 0; i < optionsArray.length; i++) {
                data.push(optionsArray[i])
            }
            console.log("[Report.js] defaultLocation :: ", { 'name': optionsArray[0], 'id': options[optionsArray[0]].id })
        }
        return data;
    }

    const getDataForDropDownCompany = () => {
        const options = props.configurationList['divaysree_company_list']
        console.log("[Report.js] options :: ", options)
        let data = []
        if (options != null && options != undefined) {
            const companies = options[campus]
            console.log("[Report.js] companies :: ", companies)

            if (companies != null && companies != undefined) {
                let optionsArray = Object.keys(companies)

                for (var i = 0; i < optionsArray.length; i++) {
                    data.push(optionsArray[i])
                }
            }
        }
        return data;
    }
    const configCampusSelect = {
        label: "Campus",
        list: getDataForDropDownCampus(),
        value: campus,
        emitEvent: (value) => {
            setCampus(value)
        }
    }

    const configCompnaySelect = {
        label: "Company",
        list: getDataForDropDownCompany(),
        value: company,
        emitEvent: (value) => {
            setCompany(value)
        }
    }
    const onFileChange = event => {

        // Update the state 
        if (event.target.files && event.target.files[0]) {
            uploadFile(event.target.files[0], uuidv4(), "messagePhoto").then((uploadResponse) => {
                if (uploadResponse.status == 200) {
                    console.log("uploadResponse", uploadResponse)
                    setImage(uploadResponse.data.fileURL)
                }
            })
        }
    };
    console.log("[EditCustomer.js] usrDtls :: ", props.usrDtls)
    return (
        <section className='add-user'>

            <div className="profilePic">
                
                <img id="target" src={image} style={{ maxWidth: 200, maxHeight: 200 }} />
                <input type="file" onChange={onFileChange} accept="image/png, image/jpeg" className="imageSelect" />
            </div>

            <TextField {...configUserNameField} />
            <div style={{ height: 5 }}></div>
            <TextField {...configMobileField} />
            <div style={{ height: 5 }}></div>
            <TextField {...configEmailId} />
            <div style={{ height: 10 }}></div>
            <DropDown {...configCampusSelect} />
            <div style={{ height: 15 }}></div>
            <DropDown {...configCompnaySelect} />
            <Footer>
                <BasicButton  {...configAddUser} />
            </Footer>
            <ConfirmationDialogue
                open={showDialogue}
                handleNo={() => setShowDialogue(false)}
                handleYes={handleEditStaff}
                body="Are you sure you want to save this user?"
                title="CONFIRM"
            />

        </section>
    )
}
AddCustomer.propTypes = {
    input: PropTypes.object,
    handleAddUser: () => { }
}

const mapStateToProps = state => {
    return {

        configurationList: state.configuration.configurationList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editUser: (id, name, phoneNumber, campus, emailId, companyName, profilePicLink) => dispatch(editUser(id, name, phoneNumber, campus, emailId, companyName, profilePicLink))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);