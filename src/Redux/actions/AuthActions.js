import {VERIFY_OTP, SEND_OTP, UPDATE_USER_DETAILS} from './actionTypes'
import APIRequest from '../../Network/APIRequest';

export const sendOTP = ( mobNum) =>{
    return (dispatch)=>{
        let apiRequest = new APIRequest()
        let inputParam = {"mobile" : mobNum};
        apiRequest.callAPI("sendOTP", inputParam).then((response) =>{
            console.log("[AuthActions.js] response", response)
            if(response.status == 200){
                //dispatch(sendOTPResult(mobNum))
            }
        });    
    }  
}



export const verifyOTP = (mobNum, OTP) =>{
    return (dispatch)=>{
        let apiRequest = new APIRequest()
        let inputParam = {"mobile" : mobNum, "otp": OTP, "userType" : "partner"};
        apiRequest.callAPI("verifyOTP", inputParam).then((response) =>{
            console.log("[AuthActions.js] response verifyOTP", response)
            if(response.status == 200){
                response = response.data
                if(response.isVerified){
                    const partnerId = response.id;
                    dispatch(verifyOTPResult(true))
                    dispatch(getStaffPartnerDetails(partnerId))
                } else {
                    alert("User authentication failed. Please try again")
                } 
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
                dispatch(updateStaffAndPartnerDetails(response.partner, response.staff))
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

