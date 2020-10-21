import {combineReducers} from 'redux';
import LoadingReducer from './loadingReducer';
import ConfigurationReducer from './configurationReducer'
import AuthReducer from './AuthReducer'
import AccoutReducer from './AccountReducer'
import UserReducer from './UserReducer'

export const rootReducer = combineReducers({
   loading: LoadingReducer,
   configuration : ConfigurationReducer,
   auth : AuthReducer,
   account : AccoutReducer,
   user : UserReducer
});