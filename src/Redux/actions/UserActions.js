import APIRequest from '../../Network/APIRequest';
import {getStaffList} from '../actions/AccountActions'

export const generateReport = (reportingParams) =>{
    return (dispatch)=>{
        let apiRequest = new APIRequest()

        apiRequest.callAPI("generateReport", reportingParams).then((response) =>{
            console.log("[UserAction.js] response getStaffList", response)
            if(response.status == 200){
                //alert('report generated')
            }
        });
    }  
}

export const addStaff = (partnerId, phoneNumber, userName, emailId, role) =>{
    return (dispatch)=>{
        let apiRequest = new APIRequest()
        let inputParams = {}

        inputParams['partnerId'] = partnerId;
        inputParams['phoneNumber'] =  phoneNumber;
        inputParams['userName'] = userName;
        inputParams['emailId'] = emailId;
        inputParams['role'] = role;
        apiRequest.callAPI("addStaff", inputParams).then((response) =>{
            console.log("[UserAction.js] response getStaffList", response)
            if(response.status == 200){
                alert('Staff has been added')
                dispatch(getStaffList(partnerId))
            }
        });
    } 
}