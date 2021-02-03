import {SELECT_LOCATION, GET_STAFF_LIST, GET_DASHBOARD_DATA, GET_PARTNER_WORKFLOW_CONFIG, 
    LIST_Of_SERVICES, SELECT_SERVICE, GET_SELECTED_LIST_DATA} from './actionTypes'
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

export const getPartnerWorkFLowConfig = (entiyType, entityId) =>{
    return async (dispatch)=>{
        let apiRequest = new APIRequest()
        let inputParam = {}
        inputParam["partnerId"] = entityId;
        inputParam["entiyType"] = entiyType;
        apiRequest.callAPI("getPartnerWorkFlowConfig", inputParam, false).then((response) =>{
            console.log("[StoreAction.js] response getPartnerWorkFlowConfig :: ", response)
            if(response.status == 200){
                if(response.dataAvailable){
                    if(response.data.configuration != null && response.data.configuration != undefined){
                        const configData = JSON.parse(response.data.configuration)
                        dispatch(getPartnerWorkFLowConfigResult(configData));
                        
                    } 
                } else {
                    
                }
            } else {
                
            }
        });
    }  
}

const getPartnerWorkFLowConfigResult = (workFlowConfig) =>{
    return {
        type: GET_PARTNER_WORKFLOW_CONFIG,
        workFlowConfig : workFlowConfig
    }
}

export const getPartnerInGroup = (partnerId) =>{
    return async (dispatch)=>{
        let apiRequest = new APIRequest()
        let inputParam = {}
        inputParam["partnerId"] = 31142;
        inputParam["consumerId"] = 473;
        apiRequest.callAPI("getPartnerInGroup", inputParam, false).then((response) =>{
            console.log("[StoreAction.js] response getPartnerInGroup :: ", response)
            if(response.status == 200){
                if(response.dataAvailable){
                    dispatch(getListOfServices(response.data))
                } 
            } 
        });
    }  
}


const getListOfServices = (services) =>{
    return {
        type: LIST_Of_SERVICES,
        services : services
    }
}

export const selectService = (selectedService) => {
    return {
        type : SELECT_SERVICE,
        selectedService : selectedService
    }
}

export const getSelectedListData = (partnerId) =>{
    return async (dispatch)=>{
        let apiRequest = new APIRequest()
        let inputParam = {}
        console.log("[AccountActions.js] partnerId ", partnerId)
        inputParam["partnerId"] = partnerId;
        inputParam["consumerId"] = 473;
        apiRequest.callAPI("getPartnerInGroup", inputParam, false).then((response) =>{
            console.log("[StoreAction.js] response getSelectedListData :: ", response)
            if(response.status == 200){
                if(response.dataAvailable){
                    dispatch(getSelectedListDataResult(response.data))
                } 
            } 
        });
    }  
}

export const getSelectedListDataResult = (selectedListData) => {
    return {
        type : GET_SELECTED_LIST_DATA,
        selectedListData : selectedListData
    }
}