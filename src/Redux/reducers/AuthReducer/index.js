import {UPDATE_USER_DETAILS, VERIFY_OTP, AUTH_START, AUTH_STOP, LOGOUT_USER} from '../../actions/actionTypes'

const initialState = {
    isAuthenticated : false,
    authenticating : false,
    staffDtls : {},
    partnerDtls : {}

}
const reducer = (state = initialState, action) => {
    switch (action.type){
        case UPDATE_USER_DETAILS: {
            return {
                ...state,
                staffDtls : action.staffDtls,
                partnerDtls : action.partnerDtls
            }
        }
        case VERIFY_OTP :{
            return {
                ...state,
                isAuthenticated : action.isAuthenticated
            }
        }
        case LOGOUT_USER : {
            return {
                ...state,
                isAuthenticated : false
            }
        }
        case AUTH_START :{
            return {
                ...state,
                authenticating : action.authenticating
            }
        }
        case AUTH_STOP :{
            return {
                ...state,
                authenticating : action.authenticating
            }
        }
    } 

    return state;
}

export default reducer