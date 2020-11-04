import React, { useState, useEffect } from 'react'
import './styles.scss'
import Header from '../../Component/header';
import EditableTable from '../../Component/staffTable';
import CustomDrawer from '../../Component/drawer';
import AddUser from '../../Component/addUser';
import Staff from '../../Component/staff'
import Dashboard from '../../Component/dashboard';
import Report from '../../Component/report';
import { connect } from 'react-redux';
import { fetchConfigurationList } from '../../Redux/actions/ConfigurationAction'
import {selectLocation} from '../../Redux/actions/AccountActions'
import {withRouter} from 'react-router-dom'
import ManageEmployee from '../../Component/manageEmployee'
import AddCustomer from '../../Component/addCustomer'
import {logoutUser} from '../../Redux/actions/AuthActions'

const Home = (props) => {

    const [isAddUser, setAddUser] = useState(false)
    const [showMenu, setShowMenu] = useState(true)

    useEffect(() => {
        props.fetchConfigurationList()
    }, []);
  
    const serviceList = [
        { id: "1", name: 'Raja', role: 'Owner', status: "active" },
        { id: "2", name: 'Ramu', role: 'staff', status: "active" }
    ]

    const roleList = [
        { id: "1", name: 'Raja', role: 'Owner', status: "active" },
        { id: "2", name: 'Ramu', role: 'staff', status: "active" }
    ]

    const renderAddRole = (input) => {
        if (isAddUser) {
            if (input == null) {
                return <AddUser />
            } else {
                const [name, role] = input
                const configAddUser = {
                    input: {
                        userName: name,
                        role: role
                    }

                }
                return <AddUser {...configAddUser} />
            }

        }
    }

    const editUser = () => {
        setAddUser(true)
        handleRightPanel()
    }

    const handleRightPanel = () => {
        const hash = props.location.hash
        var data = {}
        switch (hash) {
            case "#ManageEmployee" :
                return <ManageEmployee/>
                break;
            case "#Report" :
                return <Report />
                break;
            case "#ManageStaff" : {
                data = {
                    editAction: editUser,
                    deleteAction: () => { },
                    addAction: addUser,
                    locationData : getLocationsData()
                }
                return <Staff {...data}/>
                break;
            }
            case "#AddStaff" : {
                data = {
                    editAction: editUser,
                    deleteAction: () => { },
                    addAction: addUser
                }
                return <AddUser />
                break;
            }
            case "#AddUser" : {
                return <AddCustomer />
                break;
            }
            default :{
                const config = {
                    data: [{
                        title: "Checked In",
                        subTitle: "status",
                        value: "100"
                    }, {
                        title: "Checked Out",
                        subTitle: "status",
                        value: "10"
                    }, {
                        title: "New",
                        subTitle: "status",
                        value: "80"
                    }, {
                        title: "Denied",
                        subTitle: "status",
                        value: "2"
                    }]
                }
                return <Dashboard {...config} />
            }        
        }
    }

    const addUser = () => {
        
        props.history.push({ to:'/home', hash:"AddStaff"})
    }
    const handleMenuSelection = (hash) => {
        props.history.push({ to:'/home', hash:hash})
        return handleRightPanel()
    }

    const getLocationsData = () => {
        const options = props.configurationList['divyasree_campus']
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

    const handleLocationSelection = (location) =>{
        const options = props.configurationList['divyasree_campus']
        props.selectLocation({'name':location, 'id': options[location].id})
    }

    const configHeader = {
        title: "Home",
        isBack: false,
        leftButtonAction: () => {setShowMenu(!showMenu) },
        isLoggedIn: true,
        logoutEvent: props.logoutUser,
        selectedLocation: props.selectedLocation.name,
        locations: getLocationsData(),
        handleLocationSelection : handleLocationSelection
    }

    const menuItems =  [
        { id: 1, text: "Dashboard" },
        { id: 3, text: "Report", hash : "Report" },
        { id: 4, text: "Manage Staff", hash : "ManageStaff" },
        { id: 5, text: "Manage Employee", hash : "ManageEmployee"},
    ];

    const configMenu = {
        menuItems: menuItems,
        onSelectedMenu: handleMenuSelection
    }

    return (

        <div className='Home'>
            <Header {...configHeader} />
            <div className='main'>
                {showMenu&&<div className='leftPanel'>
                    <CustomDrawer {...configMenu} />
                </div>}
                <div className='rightPanel'>
                    {handleRightPanel()}
                </div>
            </div>
        </div>
    )
}

Home.propTypes = {
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchConfigurationList: () => dispatch(fetchConfigurationList()),
        selectLocation : (locationDtls) => dispatch(selectLocation(locationDtls)),
        logoutUser : ()=>dispatch(logoutUser())
    }
}

const mapStateToProps = state => {
    return {
        configurationList: state.configuration.configurationList,
        account: state.account,
        selectedLocation: state.account.selectedLocation
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));