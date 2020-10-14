import { showLoadingIndicator, hideLoadingIndicator } from "../Redux/actions/LoadingActions";
//import store from '../Redux/store/configStore';


export default class APIResponseHelper {
    parseResponse = async (response) => {
        
        let status = response.status;
        let dataAvailable = false;
        let jsonData = null;
        if(status == 200){
            let data = await response.text();
            console.log("[APIResponseHelper.js] response data :: ", data, data.length)
            try{
                if(data != null && data != undefined && data.length > 1){
                    jsonData = JSON.parse(data);
                    dataAvailable = true;
                    if(jsonData.status == "error"){
                        status = 500;
                        //store.dispatch(showNotification('Error', jsonData.message, ''))   
                    }
                }
            }catch (error){
                console.log("[APIResponseHelper.js] exception trying to parse the response :: ", error)
            } finally{
               
            }
        }else{
           
        }
        console.log("[APIResponseHelper.js] returning from APIResponseHelper")
        return {status : status, dataAvailable : dataAvailable, data : jsonData}
    }
}