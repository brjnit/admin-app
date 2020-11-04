import {SELECT_LOCATION, GET_STAFF_LIST, GET_DASHBOARD_DATA} from './actionTypes'
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
            console.log("[AccountAction.js] response getStaffList", response)
            if(response.status == 200){
                response = response.data
                dispatch(getStaffListResult(response))
            }
        });
    }  
}

export const deleteStaff = (id, partnerId) =>{
    return (dispatch)=>{
        let apiRequest = new APIRequest()
        let inputParam = {"id" : id, "isDeleted":true};
        apiRequest.callAPI("deleteStaff", inputParam).then((response) =>{
            console.log("[AccountAction.js] response deleteStaff", response)
                dispatch(getStaffList(partnerId))
        });
    }  
}


const getStaffListResult = (staffList) => {
    return {
        type : GET_STAFF_LIST,
        staffList : staffList
    }

}


export const getDashBoardData = (startDate, endDate, campus, type) =>{
    return (dispatch)=>{
        let apiRequest = new APIRequest()
        let inputParam = {};//{"id" : id, "isDeleted":true};
        inputParam['startDate'] = startDate;
        inputParam['endDate'] = endDate;
        inputParam['campus'] = campus;
        inputParam['enquiryType'] = type;
        apiRequest.callAPI("getDashBoardData", inputParam).then((response) =>{
            console.log("[AccountAction.js] response getDashBoardData", response)
            if(response.status == 200){
                dispatch(getDashBoardDataResult(response.data))
            }
        });
    }
}

const getDashBoardDataResult = (dashboardData) =>{
    return {
        type : GET_DASHBOARD_DATA,
        dashboardData: dashboardData
    }
}