import {VERIFY_OTP, SEND_OTP, UPDATE_USER_DETAILS, AUTH_START, AUTH_STOP,LOGOUT_USER} from './actionTypes'
import APIRequest from '../../Network/APIRequest';

export const sendOTP = ( mobNum) =>{
    return (dispatch)=>{
        let apiRequest = new APIRequest()
        let inputParam = {"mobile" : mobNum};
        dispatch(authStart())
        apiRequest.callAPI("sendOTP", inputParam).then((response) =>{
            console.log("[AuthActions.js] response", response)
            if(response.status == 200){
                dispatch(authStop())
            } else {
                dispatch(authStop())
            }
        });    
    }  
}

export  const authStart = () =>{
    return {
       type : AUTH_START,
       authenticating : true
    }
}

export  const authStop = () =>{
    return {
       type : AUTH_STOP,
       authenticating : false
    }
}



export const verifyOTP = (mobNum, OTP) =>{
    return (dispatch)=>{
        let apiRequest = new APIRequest()
        let inputParam = {"mobile" : mobNum, "otp": OTP, "userType" : "partner"};
        dispatch(authStart());
        apiRequest.callAPI("verifyOTP", inputParam).then((response) =>{
            console.log("[AuthActions.js] response verifyOTP", response)
            if(response.status == 200){
                response = response.data
                if(response.isVerified){
                    const partnerId = response.id;
                    
                    dispatch(getStaffPartnerDetails(partnerId))
                } else {
                    dispatch(authStop());
                    alert("User authentication failed. Please try again")
                } 
            }   else {
                dispatch(authStop());
                alert("User authentication failed. Please try again")
            } 
        });
    }  
}

export const verifyOTPResult = (isAuthenticated) => {
    return {
        type: VERIFY_OTP,
        isAuthenticated : isAuthenticated
    }
}

export const getStaffPartnerDetails = (staffId) =>{
    return (dispatch)=>{
        let apiRequest = new APIRequest()
        let inputParam = {"staffId" : staffId};
        apiRequest.callAPI("getStaffPartnerDetails", inputParam).then((response) =>{
            console.log("[AuthActions.js] response getStaffPartnerDetails", response)
            if(response.status == 200){
                response = response.data
                if(response.staff.role == "Admin"){
                    
                    dispatch(authStop())
                    dispatch(updateStaffAndPartnerDetails(response.partner, response.staff))
                    setTimeout(10000,dispatch(verifyOTPResult(true)))
                    
                    
                } else {
                    alert("You are not authorized to access the dashboard   ")
                    dispatch(authStop())
                }
            }
        });
    } 
}


const updateStaffAndPartnerDetails = ( partnerDtls, staffDtls) =>{
    return{
        type : UPDATE_USER_DETAILS,
        staffDtls : staffDtls,
        partnerDtls : partnerDtls
    }
}

export const logoutUser = () =>{
    return {
        type : LOGOUT_USER
    }
}