import React, { Component } from "react";
import PropTypes from 'prop-types';
import './styles.scss'
import Wrapper from "../../hoc/Wrapper";
import { connect } from "react-redux";
import EditableTable from '../staffTable'
import { getStaffList, deleteStaff } from '../../Redux/actions/AccountActions'
import DropDown from '../dropDown'



class Staff extends Component {
   
    constructor(props) {
        super(props);
        const options = this.props.configurationList['divyasree_campus']
        console.log("[Staff.js] options :: ", options)
        if (options != null && options != undefined) {
            let optionsArray = Object.keys(options)
            console.log("[Home.js] optionsArray :: ", optionsArray)
            this.state = {
                locationDtls: { 'name': optionsArray[0], 'id': options[optionsArray[0]].id }
            }
        }
    }

    getData = () => {
        const staffList = this.props.staffList;
        let data = []
        console.log("[Staff.js] staffList  ", staffList)
        staffList.map(staff => {
            data.push({ id: staff.id, name: staff.userName, 'phoneNumber': staff.phoneNumber, emailId: staff.emailId, role: staff.role })
        })

        return data;
    }

    deleteStaffHandler = (id) => {
        console.log("[staff.js] selected staff id ", id)
        this.props.deleteStaff(id, this.props.selectedLocation.id)
    }

    handleLocationSelection = (location) => {
        const options = this.props.configurationList['divyasree_campus']
        //this.setLocationDtls({'name':location, 'id': options[location].id})
    }

    getLocationsData = () => {
        const options = this.props.configurationList['divyasree_campus']
        console.log("[Home.js] options :: ", options)
        let data = []
        if (options != null && options != undefined) {
            let optionsArray = Object.keys(options)
            console.log("[Home.js] optionsArray :: ", optionsArray)

            for (var i = 0; i < optionsArray.length; i++) {
                data.push(optionsArray[i])
            }
        }
        return data;
    }

    data = {
        title: "Manage Staff",
        data: this.getData(),
        //editAction: editUser,
        addText: "ADD STAFF",
        headers: ["Id", "Name", "Mobile Number", "Email Id", "Role", "Action"],
        addAction: this.props.addAction,
        deleteAction: this.deleteStaffHandler,
        selectedLocation: this.props.selectedLocation
    }


    configLocationSelect = {
        label: "Location",
        list: this.getLocationsData(),
        showLable: false,
        value: this.state.locationDtls.name,
        emitEvent: (value) => {
            this.handleLocationSelection(value)
        }
    }

    componentDidMount = () => {
        this.props.getStaffList(this.state.locationDtls.id)
    }


    render() {
        return (
            <Wrapper>
                <DropDown {...this.configLocationSelect} />
                <EditableTable {...this.data} />
            </Wrapper>

        )
    }
}






const mapStateToProps = state => {
    return {
        configurationList: state.configuration.configurationList,
        staffList: state.account.staffList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getStaffList: (partnerId) => dispatch(getStaffList(partnerId)),
        deleteStaff: (staffId, partnerId) => dispatch(deleteStaff(staffId, partnerId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Staff);