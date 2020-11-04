import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import './styles.scss'
import Wrapper from "../../hoc/Wrapper";
import { connect } from "react-redux";
import EditableTable from '../staffTable'
import {getStaffList, deleteStaff} from '../../Redux/actions/AccountActions'


const Staff = (props) => {
  
    const getData = () =>{
        const staffList = props.staffList;
        let data = []
        console.log("[Staff.js] staffList  ", staffList)
         staffList.map(staff => {
             data.push({id:staff.id, name: staff.userName, 'phoneNumber': staff.phoneNumber, emailId: staff.emailId, role: staff.role })
         })

        return data;
    }

    const deleteStaffHandler = (id) =>{
        console.log("[staff.js] selected staff id ", id)
        props.deleteStaff(id, props.selectedLocation.id)
    }

    const data = {
        title : "Manage Staff",
        data : getData(),
        //editAction: editUser,
        addText : "ADD STAFF",
        headers : ["Id", "Name", "Mobile Number", "Email Id", "Role", "Action"],
        addAction: props.addAction,
        deleteAction : deleteStaffHandler
    }

   

    useEffect(() => {
        props.getStaffList(props.selectedLocation.id)
    },[props.selectedLocation]);

    return (
        <Wrapper>
            <EditableTable {...data} />
        </Wrapper>

    )
}


Staff.propTypes = {
    data: PropTypes.array,
    selectedLocation : PropTypes.object
}


const mapStateToProps = state => {
    return {
        configurationList: state.configuration.configurationList,
        staffList : state.account.staffList,
        selectedLocation: state.account.selectedLocation
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        getStaffList : (partnerId) => dispatch(getStaffList(partnerId)),
        deleteStaff : (staffId,partnerId) => dispatch(deleteStaff(staffId, partnerId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Staff);