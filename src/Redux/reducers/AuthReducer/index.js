import {UPDATE_USER_DETAILS, VERIFY_OTP} from '../../actions/actionTypes'

const initialState = {
    isAuthenticated : false,
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
    } 

    return state;
}

export default reducer