import {SELECT_LOCATION, GET_STAFF_LIST} from './actionTypes'
import APIRequest from '../../Network/APIRequest';

export const selectLocation = (locationDtls) => {
    return {
        type: SELECT_LOCATION,
        locationDtls : locationDtls
    }
}



export const getStaffList = (partnerId) =>{
    return (dispatch)=>{
        let apiRequest = new APIRequest()
        let inputParam = {"partnerId" : partnerId};
        apiRequest.callAPI("getStaffList", inputParam).then((response) =>{
            console.log("[AuthActions.js] response getStaffList", response)
            if(response.status == 200){
                response = response.data
                dispatch(getStaffListResult(response))
            }
        });
    }  
}


const getStaffListResult = (staffList) => {
    return {
        type : GET_STAFF_LIST,
        staffList : staffList
    }

}