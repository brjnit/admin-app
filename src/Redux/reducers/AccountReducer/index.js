import {SELECT_LOCATION, GET_STAFF_LIST} from '../../actions/actionTypes'

const initialState = {
    selectedLocation : {
        name : ''
    },
    staffList : []
    

}
const reducer = (state = initialState, action) => {
    switch (action.type){
        case SELECT_LOCATION: {
            return {
                ...state,
                selectedLocation : action.locationDtls,
            }
        }
        case GET_STAFF_LIST : {
            return {
                ...state,
                staffList : action.staffList
            }
        }
    } 

    return state;
}

export default reducer