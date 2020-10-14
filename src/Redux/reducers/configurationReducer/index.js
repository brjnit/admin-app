import {  FETCH_CONFIGURATION } from "../../actions/actionTypes";

const initialState = {
    configurationList : {}
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case FETCH_CONFIGURATION: {
            return {
                ...state,
                configurationList : action.configurationList,
            }
        }
    }
    return state;
}

export default reducer