import { GET, POST, DELETE, PUT} from "./MethodType";

const apiList = {
    sendOTP : {
        path : "/authentication/sendOtp",
        method : POST,
        params : ["mobile"]
    },
    verifyOTP :{
        path : "/authentication/verifyOtp",
        method : POST,
        params : ["mobile", "otp", "userType"]        
    },
    getStaffPartnerDetails : {
        path : "/staff/$staffId",
        method : GET,
        params : ["staffId"]   
    },
    fetchConfigurationList : {
        path : "/config/tenant",
        method : GET,
        params : []
    },
    getStaffList : {
        path : "/partner/$partnerId/staffs",
        method : GET,
        params : ['partnerId']
    },
    generateReport : {
        path : "/reportingv2?start=$startDate&end=$endDate&campus=$campus&enquiryType=$enquiryType&reportType=$reportType&company=$company&email=$email",
        method : GET,
        params : ['startDate','endDate','campus','enquiryType','reportType','company','email']
    },
    addStaff : {
        path : "/staff",
        method : POST,
        params : ['partnerId', 'phoneNumber', 'userName', 'emailId', 'role']
    },
    addNewUser: {
        path : "/consumer",
        method : POST,
        params : ["name", "phoneNumber", "emailId", "campus", "companyName", "employeeId", "appVersion", "profilePicLink"]
    },
    editStaff : {
        path : "/staff",
        method : PUT,
        params : ['id','partnerId', 'phoneNumber', 'userName', 'emailId', 'role']
    },
    deleteStaff :{
        path : "/staff",
        method : PUT,
        params : ['id', 'isDeleted']
    },
    getDashBoardData : {
        path : 'enquiry/status/count?start=$startDate&end=$endDate&campus=$campus&enquiryType=$enquiryType',
        method : GET,
        params : ['startDate', 'endDate', 'campus', 'enquiryType']
    },
    getConsumerByPhone : {
        path : '/consumerByPhoneNumber/$phoneNumber',
        method : GET,
        params : ['phoneNumber']
    }
}    

export const getAPITemplate = (apiName) =>{
    return apiList[apiName];
}