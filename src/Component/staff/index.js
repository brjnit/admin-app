import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import './styles.scss'
import Wrapper from "../../hoc/Wrapper";
import { connect } from "react-redux";
import EditableTable from '../staffTable'
import {getStaffList} from '../../Redux/actions/AccountActions'


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


    const data = {
        title : "Manage Staff",
        data : getData(),
        //editAction: editUser,
        deleteAction: () => { },
        addText : "ADD STAFF",
        headers : ["Id", "Name", "Mobile Number", "Email Id", "Role", "Action"],
        addAction: props.addAction
    }

    useEffect(() => {
        props.getStaffList(props.selectedLocation.id)
    }, []);

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
        staffList : state.account.staffList
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        getStaffList : (partnerId) => dispatch(getStaffList(partnerId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Staff);