import {GET_CONSUMER_DTLS} from '../../actions/actionTypes'

const initialState = {
    manageUser : {
        selectedUserDtls : {}
    }
    

}
const reducer = (state = initialState, action) => {
    switch (action.type){
        case GET_CONSUMER_DTLS: {
            return {
                ...state,
                manageUser : {
                    ...state.manageUser,
                    selectedUserDtls : action.consumerDtls
                },
            }
        }
    } 
    return state;
}

export default reducer