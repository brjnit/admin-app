import {SELECT_LOCATION, GET_STAFF_LIST, GET_DASHBOARD_DATA} from '../../actions/actionTypes'

const initialState = {
    selectedLocation : {
        name : ''
    },
    staffList : [],
    dashboardData : []
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
    } 

    return state;
}

export default reducer