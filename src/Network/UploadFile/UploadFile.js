import {API_URL} from '../../config'



export const uploadFile = async (uploadFile, id, entityType) => {

    if(entityType == undefined || entityType == null){
        entityType = "messagePhoto"
    }
    let url = API_URL + "/upload/?entityId=" + id + "&entityType="+entityType;
    let body = new FormData();
    body.append('file', uploadFile);
    //body.append('Content-Type', uploadFile.type);
    console.log("[UploadFile.js] request body :: ", JSON.stringify(body));

    let response = await fetch(
        url,
        {
        body: body,
        method: "POST",
        headers: {
            //'Content-Type': 'multipart/form-data'
            }
        }
    )
    let status = response.status;
    let dataAvailable = false;
    let jsonData = null;
    let data = await response.text();
        console.log("[UploadFile.js] response data :: ", data, data.length)
    if(status == 200){
        
        try {
            if(data != null && data != undefined && data.length > 1){
                jsonData = JSON.parse(data);
                dataAvailable = true;
            }
        } catch (error) {
            console.log("[UploadFile.js] exception trying to parse the response :: ", error);
            status = 500;
        }
    }
    return {status : status, dataAvailable : dataAvailable, data : jsonData}
}