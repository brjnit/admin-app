import APIRequest from '../../Network/APIRequest';
import {getStaffList} from '../actions/AccountActions'
import {GET_CONSUMER_DTLS, FETCH_USER_START, FETCH_USER_ERROR} from './actionTypes'

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

export const addNewUser = (name, phoneNumber, campus, emailId, companyName, profilePicLink) =>{
    return (dispatch)=>{
        let apiRequest = new APIRequest()
        let inputParams = {}
        inputParams['name'] = name;
        inputParams['phoneNumber'] =  phoneNumber;
        inputParams['campus'] = campus;
        inputParams['emailId'] = emailId;
        inputParams['companyName'] = companyName;
        inputParams['profilePicLink'] = profilePicLink;
        apiRequest.callAPI("addNewUser", inputParams).then((response) =>{
            console.log("[UserAction.js] addNewUser", response)
            if(response.status == 200){
                alert('User registered successfully')
                //dispatch(getStaffList(partnerId))
            }
        });
    } 
}

export const editUser = (id,name, phoneNumber, campus, emailId, companyName, profilePicLink) =>{
    return (dispatch)=>{
        let apiRequest = new APIRequest()
        let inputParams = {}
        inputParams['id'] = id;
        inputParams['name'] = name;
        inputParams['phoneNumber'] =  phoneNumber;
        inputParams['campus'] = campus;
        inputParams['emailId'] = emailId;
        inputParams['companyName'] = companyName;
        inputParams['profilePicLink'] = profilePicLink;
        apiRequest.callAPI("addNewUser", inputParams).then((response) =>{
            console.log("[UserAction.js] addNewUser", response)
            if(response.status == 200){
                alert('Changes Saved successfully')
            }
        });
    } 
}


export const getConsumerByPhone = (phoneNumber) =>{
    return (dispatch)=>{
        let apiRequest = new APIRequest()
        let inputParams = {}
        inputParams['phoneNumber'] =  phoneNumber;
        dispatch(fetchStart())
        apiRequest.callAPI("getConsumerByPhone", inputParams).then((response) =>{
            console.log("[UserAction.js] getConsumerByPhone", response)
            if(response.status == 200){
                dispatch(getConsumerByPhoneResult(response.data))
            } else {
                dispatch(fetchError({...response,"errorMessage":"The mobile number is not registered"}))
            }
        });
    }
}

export const getConsumerByPhoneResult = (consumerDtls) =>{
    return {
        type : GET_CONSUMER_DTLS,
        consumerDtls : consumerDtls
    }
}


export const fetchStart = () =>{
    return  {
        type : FETCH_USER_START
    }
}

export const fetchError = (error) =>{
    return  {
        type : FETCH_USER_ERROR,
        error : error
    }
}