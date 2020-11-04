import {getAPITemplate} from './APIDefinition'
import {GET, POST} from './MethodType'
import {API_URL} from '../config'
import APIResponseHelper from './APIResponseHelper'
import {showLoadingIndicator, hideLoadingIndicator} from '../Redux/actions/LoadingActions'
import store from '../Redux/store/configStore'
 
export default class APIRequest {
    callAPI = async (apiName, inputParams) =>{
        let requestTemplate = null;
        requestTemplate = getAPITemplate(apiName)
        console.log("[APIRequest.js]  requestTemplate :: ",requestTemplate);
        if(requestTemplate !=null){
            let postBody = null;
            let url = API_URL;
            let requestPath = "";
            const state = store.getState();
            if(requestTemplate.method == GET){
                requestPath = this.generateGETRequest(requestTemplate, inputParams);
                let headers = {
                }
                console.log("[APIRequest.js]  partnerDtls :: ",state.auth.partnerDtls);
                if( state.auth.partnerDtls.tenant != null && state.auth.partnerDtls.tenant != undefined){
                    headers["tenant"] = state.auth.partnerDtls.tenant
                }
                //headers["tenant"] = 'technopolis'
                postBody = {
                            method: GET,
                            headers: headers
                        }
                url = url+ requestPath;
            } else {
                postBody = this.generatePOSTBody(requestTemplate, inputParams);
                url = url+requestTemplate.path;
            }
            console.log("[APIRequest.js]  final url :: ", url);
            let response = null;
            try{
                //store.dispatch(showLoadingIndicator());
                console.log("[APIRequest.js]  final postBody :: ", postBody);
                response = await fetch(url, postBody);
                const responseHelper = new APIResponseHelper();
                return await responseHelper.parseResponse(response);
            }catch (error){
                //store.dispatch(hideLoadingIndicator());
                console.log("[APIRequest.js] error while making API request :: ", error);
                //store.dispatch(showNotification('Error', 'Uh Oh, Something went wrong.', ' Please try again'))
                return {status : 500, dataAvailable : false, data : null}
                
            }    
        }
    }

    generateGETRequest = (requestTemplate, inputParams) =>{
        const paramNames = requestTemplate.params;
        let path = requestTemplate.path
        if(paramNames == null || paramNames == undefined){
            return requestTemplate.path;
        } else {
            for(let i = 0; i < paramNames.length; i++){
                const paramValue = inputParams[paramNames[i]];
                console.log("[APIRequest.js]  paramValue :: ", paramValue);
                if(paramValue == undefined || paramValue == null){
                    const position = path.indexOf(paramNames[i])
                    let firstPath = path.substring(0,position)
                    let lastPath = path.substring(position,path.length)
                    firstPath = firstPath.substring(0,firstPath.lastIndexOf('&')+1)
                    lastPath = lastPath.substring(lastPath.indexOf('&')+1, lastPath.lenght)
                    console.log(firstPath+lastPath)
                    path = firstPath+lastPath
                } else {
                    path = path.replace("$"+paramNames[i], inputParams[paramNames[i]])
                }
            }
            //requestTemplate["path"] = path;
            return path;
        }
    }

    generatePOSTBody = (requestTemplate, inputParams) =>{
        const state = store.getState();
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            
        }
        if( state.auth.partnerDtls.tenant != null && state.auth.partnerDtls.tenant != undefined){
            headers["tenant"] = state.auth.partnerDtls.tenant
        }
        //headers["tenant"] = 'technopolis'
        let body = {
            method: requestTemplate.method,
            headers: headers,
            body: JSON.stringify(inputParams)
        }
        return body
    }
}