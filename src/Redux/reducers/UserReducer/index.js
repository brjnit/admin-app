import {GET_CONSUMER_DTLS, FETCH_USER_START, FETCH_USER_ERROR} from '../../actions/actionTypes'

const initialState = {
    manageUser : {
        selectedUserDtls : {detailsAvailable: false},
        fetchStart: false,
        fetchError : {}
    }
    

}
const reducer = (state = initialState, action) => {
    switch (action.type){
        case GET_CONSUMER_DTLS: {
            return {
                ...state,
                manageUser : {
                    ...state.manageUser,
                    selectedUserDtls : {...action.consumerDtls, detailsAvailable : true},
                    fetchStart : false,
                    fetchError : {}
                },
            }
        }
        case FETCH_USER_START: {
            return {
                ...state,
                manageUser : {
                    ...state.manageUser,
                    selectedUserDtls : { detailsAvailable : false},
                    fetchStart : true,
                    fetchError :{}
                },
            }
        } 
        case FETCH_USER_ERROR : {
            return {
                ...state,
                manageUser : {
                    ...state.manageUser,
                    selectedUserDtls : { detailsAvailable : false},
                    fetchStart : false,
                    fetchError : action.error
                },
            }
        }
    } 
    return state;
}

export default reducer