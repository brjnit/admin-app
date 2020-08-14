import { GET, POST, DELETE, PUT} from "./MethodType";
import { BeenhereRounded } from "@material-ui/icons";

const apiList = {
    /*apiName: {
        path :  url,
        method : methodType,
        params : [params...]
    }*/
}    

export const getAPITemplate = (apiName) =>{
    return apiList[apiName];
}