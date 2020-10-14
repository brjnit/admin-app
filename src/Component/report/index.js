import React, { useState } from "react";
import PropTypes from 'prop-types';
import DropDown from '../dropDown'
import './styles.scss'
import Wrapper from "../../hoc/Wrapper";
import BasicButton from "../basicButton";
import {  connect } from "react-redux";
import DatePicker from 'react-date-picker';
import { InputLabel } from "@material-ui/core";
import TextField from '../textField';
import {generateReport} from '../../Redux/actions/UserActions'



const Report = (props) => {
    const [campus, setCampus] = useState('')
    const [company, setCompany] = useState('')
    const [type, setType] = useState('')
    const [emailId, setEmailId] = useState(props.staffDtls.emailId)
    const [fromDate, onSelectFromDate] = useState(new Date());
    const [toDate, onSelectToDate] = useState(new Date());
    
    const configEmailField = {
        label: "Report will be emailed on this email Id",
        placeHolder: "Enter email address",
        value: emailId,
        onTextChange: (value) => {
            setEmailId(value)
        }
    }
    
    const handleSubmit = () => {
        let reportingParams = {}
        if(fromDate>toDate){
            alert('Start date cant be greater than end date')
            return;
        }
    
        reportingParams['startDate'] = getFormatedDate(fromDate)
        toDate.setTime(toDate.getTime() + 86400000);
        reportingParams['endDate'] = getFormatedDate(toDate)
        if(campus != ''&& campus != 'All'){
            reportingParams['campus'] = campus
        } else {
            reportingParams['campus'] = null
        }
        if(campus != ''&& campus != 'All'){
            reportingParams['company'] = company
        }else{
            reportingParams['company'] = null
        }
        if(type == ''){
            alert('Please select the entry type value')
            return;
        } else {
            reportingParams['enquiryType'] = type.toUpperCase()
            reportingParams['reportType'] = type.toLowerCase()
        }
        if(emailId == '' || emailId == null || emailId == undefined){
            alert('Please enter the email id')
            return;
        } else {
            reportingParams['email'] = emailId;
        }
        console.log("[Report.js] reportingParams :: ", reportingParams)
        props.generateReport(reportingParams)
        setTimeout(function(){ alert("The report will be emailed to the provided email id."); }, 2000);
    }

    const getFormatedDate = (date) =>{
        return ((date.getMonth() > 8) ? (date.getMonth() + 1)+'' : ('0' + (date.getMonth() + 1))) + ((date.getDate() > 9) ? date.getDate() +'': ('0' + date.getDate())) +  date.getFullYear();
    }

    const configGenerateReport = {
        buttonText: "GENERATE REPORT",
        isEnable: true,
        emitEvent: handleSubmit
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
        const companies = options[campus]
        console.log("[Report.js] companies :: ", companies)

        if(companies != null && companies != undefined){
            let optionsArray = Object.keys(companies)
            
            for(var i = 0; i < optionsArray.length; i++){
                data.push(optionsArray[i] )
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

    const configTypeSelect = {
        label: "Type",
        list: ['Visitor', 'Employee'],
        emitEvent: (value) => {
            setType(value)
        }
    }

    const checkSubmitButton = () => {
        console.log("campus", campus, company, type)
        return campus != '' && company != '' && type != ''
    }

    

    console.log("[reports.js] configurationList :: ", props.configurationList)

    // useEffect(() => {
    //     checkSubmitButton()
    // }, []);
    return (
        <Wrapper>
            <div>Please select below fields to generate report </div>
            <div className="report">
                <div className="date_select">
                    <InputLabel className = "inputLabel">From Date</InputLabel>
                    <DatePicker
                        onChange={onSelectFromDate}
                        value={fromDate}
                        maxDate = {new Date()}
                    />
                </div>
                <div className="date_select">
                    <InputLabel className = "inputLabel">To Date</InputLabel>
                    <DatePicker
                        onChange={onSelectToDate}
                        value={toDate}
                        maxDate = {new Date()}
                    />
                </div>
                <div className="compus_select">
                    <DropDown {...configCampusSelect} />
                </div>
                <div className="compus_select">
                    <DropDown {...configCompanySelect} />
                </div>
                <div className="compus_select">
                    <DropDown {...configTypeSelect} />
                </div>
                
            </div>
            <div className = 'bottomAction'>
                    <TextField {...configEmailField} />
                    <div className ="addUser">
                        <BasicButton {...configGenerateReport}/>
                    </div>
            </div>
        </Wrapper>

    )
}
Report.propTypes = {
    data: PropTypes.array
}


const mapStateToProps = state => {
    return {
        configurationList: state.configuration.configurationList,
        staffDtls : state.auth.staffDtls
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        generateReport : (reportingParams) => dispatch(generateReport(reportingParams))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);