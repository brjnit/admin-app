import React, { useState, useEffect } from 'react'
import './styles.scss'
import Header from '../../Component/header';
import EditableTable from '../../Component/staffTable';
import CustomDrawer from '../../Component/drawer';
import AddUser from '../../Component/addUser';
import AddService from '../../Component/addService'
import Staff from '../../Component/staff'
import Dashboard from '../../Component/dashboard';
import Report from '../../Component/report';
import { connect } from 'react-redux';
import { fetchConfigurationList } from '../../Redux/actions/ConfigurationAction'
import {selectLocation, getPartnerWorkFLowConfig} from '../../Redux/actions/AccountActions'
import {withRouter} from 'react-router-dom'
import ManageEmployee from '../../Component/manageEmployee'
import AddCustomer from '../../Component/addCustomer'
import {logoutUser} from '../../Redux/actions/AuthActions'
import ManageServices from '../../Component/ManageServices'
import ServiceDetails from '../../Component/ServiceDetails'


const Home = (props) => {

    const [isAddUser, setAddUser] = useState(false)
    const [showMenu, setShowMenu] = useState(true)
    const consoleConfig = props.configurationList.console
    let theme = "dailyget"
    if(consoleConfig!=undefined && consoleConfig.theme !=undefined){
        theme = consoleConfig.theme
    }

    useEffect(() => {
        props.fetchConfigurationList()
        props.getPartnerWorkFLowConfig("PARTNER", props.partnerDtls.id)
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
        console.log("[Home.js] props ", props)
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
            case "#ManageServices" : {
                data = {
                    editAction: editUser,
                    deleteAction: () => { },
                    addAction: addUser
                }
                return <ManageServices />
                break;
            }
            case "#AddService" : {
                data = {
                    editAction: editUser,
                    deleteAction: () => { },
                    addAction: addUser
                }
                return <AddService />
                break;
            }
            case "#ServiceDetails" : {
                return <ServiceDetails />
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

    

    const getMenuItems = () =>{
        const consoleConfig = props.configurationList.console
        let menuItems =  [
            { id: 1, text: "Dashboard", icon : "dashboard" },
            { id: 3, text: "Report", hash : "Report", icon : "assessment" },
            { id: 4, text: "Control Access", hash : "ManageStaff", icon : "lock" },
            { id: 6, text: "Manage Services", hash : "ManageServices", icon : "settingsapplication"},
            { id: 5, text: "Manage Employee", hash : "ManageEmployee", icon : "settingsapplication"},
            
        ];
        console.log("[Home.js] consoleConfig :: ", consoleConfig)
        if(consoleConfig != undefined &&  consoleConfig.menus!= undefined){
            menuItems = consoleConfig.menus
        }

        return menuItems
    }

    const configMenu = {
        menuItems: getMenuItems(),
        onSelectedMenu: handleMenuSelection
    }

  
    return (
        <div className='Home'>
            <Header {...configHeader} theme = {theme}/>
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
        logoutUser : ()=>dispatch(logoutUser()),
        getPartnerWorkFLowConfig : (entiyType, entityId) => (dispatch(getPartnerWorkFLowConfig(entiyType, entityId)))
    }
}

const mapStateToProps = state => {
    return {
        configurationList: state.configuration.configurationList,
        account: state.account,
        selectedLocation: state.account.selectedLocation,
        partnerDtls : state.auth.partnerDtls,
        workFlowConfig : state.account.workFlowConfig
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));