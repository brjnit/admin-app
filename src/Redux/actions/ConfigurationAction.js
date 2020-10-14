import { FETCH_CONFIGURATION } from "./actionTypes";
import APIRequest from '../../Network/APIRequest';
import {selectLocation} from './AccountActions'

export const fetchConfigurationList = () =>{
    return (dispatch)=>{
        let apiRequest = new APIRequest()
        apiRequest.callAPI("fetchConfigurationList", {}, false).then((response) =>{
            console.log("[ConfigurationAction.js] fetchConfigurationList response :: ", response)
            if(response.status == 200){
                if(response.dataAvailable){
                    const configData = response.data[0].data;
                    console.log("[ConfigurationAction.js] configData :: ", configData )
                    const configurationList = JSON.parse(configData);
                    dispatch(fetchConfigurationResult(configurationList));
                    const options = configurationList['divyasree_campus']
                    console.log("[ConfigurationAction.js] options :: ", options)
                    let data = []
                    if (options != null && options != undefined) {
                        let optionsArray = Object.keys(options)
                        console.log("[ConfigurationAction.js] optionsArray :: ", optionsArray)
                        for (var i = 0; i < optionsArray.length; i++) {
                            data.push(optionsArray[i])
                        }
                        console.log("[ConfigurationAction.js] defaultLocation :: ",{'name':optionsArray[0], 'id': options[optionsArray[0]].id})
                        dispatch(selectLocation({'name':optionsArray[0], 'id': options[optionsArray[0]].id}));
                    }
                }
            }
        });    
    }  
}

const fetchConfigurationResult = (configurationList) =>{
    return {
        type : FETCH_CONFIGURATION,
        configurationList : configurationList,
    }
}
