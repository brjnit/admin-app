import { CallToActionSharp } from '@material-ui/icons'
import {SELECT_LOCATION, GET_STAFF_LIST, GET_DASHBOARD_DATA, GET_PARTNER_WORKFLOW_CONFIG,
     LIST_Of_SERVICES, SELECT_SERVICE, GET_SELECTED_LIST_DATA} from '../../actions/actionTypes'

const initialState = {
    selectedLocation : {
        name : ''
    },
    staffList : [],
    dashboardData : [],
    services : [],
    selectedService : {},
    selectedListData : []
}
const reducer = (state = initialState, action) => {
    switch (action.type){
        case SELECT_LOCATION: {
            return {
                ...state,
                selectedLocation : {...action.locationDtls},
            }
        }
        case GET_STAFF_LIST : {
            return {
                ...state,
                staffList : action.staffList
            }
        }
        case GET_DASHBOARD_DATA : {
            return {
                ...state,
                dashboardData : action.dashboardData
            }
        }
        case GET_PARTNER_WORKFLOW_CONFIG : {
            return {
                ...state,
                workFlowConfig : action.workFlowConfig
            }
        }
        case LIST_Of_SERVICES :{
            return {
                ...state,
                services : action.services
            }
        }
        case SELECT_SERVICE : {
            return {
                ...state,
                selectedService : action.selectedService
            }
        }
        case GET_SELECTED_LIST_DATA : {
            return {
                ...state,
                selectedListData : action.selectedListData
            }
        }
    } 

    return state;
}

export default reducer