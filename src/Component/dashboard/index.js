import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import Card from '../card'
import './styles.scss'
import { AccountBalance } from "@material-ui/icons";
import {connect} from 'react-redux'
import { getDashBoardData } from "../../Redux/actions/AccountActions";

const Dashboard = (props) => {
    
    const [fromDate, onSelectFromDate] = useState(new Date());
    const [toDate, onSelectToDate] = useState(new Date());
    
    const handleDisplay= () => {
        const data = props.dashboardData
        console.log("[Dashboard.js] data :: ", props.dashboardData) 
        if (data !=null && data!= undefined && data.length>0) {
           return  data.map( (item) => {
                console.log("[Dashboard.js] item :: ", item) 
                let itemArray = item.split(",")
                console.log("[Dashboard.js] itemArray :: ", itemArray) 
                return <Card title = {itemArray[0]} value = {itemArray[1]}  />
            })
        }
    }
     useEffect(() => {
        toDate.setTime(toDate.getTime() + 86400000)
        props.getDashBoardData(getFormatedDate(fromDate), getFormatedDate(toDate))
     }, []);

     const getDashBoardDataTest = () =>{
        toDate.setTime(toDate.getTime() + 86400000)
        props.getDashBoardData(getFormatedDate(fromDate), getFormatedDate(toDate))
     }
    
    const getFormatedDate = (date) =>{
        return ((date.getMonth() > 8) ? (date.getMonth() + 1)+'' : ('0' + (date.getMonth() + 1))) + ((date.getDate() > 9) ? date.getDate() +'': ('0' + date.getDate())) +  date.getFullYear();
    }
    
    return (
        <div className="dashboard">
            {handleDisplay() }
        </div>
    )
}
Dashboard.propTypes = {
    data: PropTypes.array
}

const mapStateToProps = state =>{
    return {
        dashboardData : state.account.dashboardData
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        getDashBoardData : (startDate, endDate, campus, type) => dispatch(getDashBoardData(startDate, endDate, campus, type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);