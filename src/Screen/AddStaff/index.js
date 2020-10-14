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

const AddStaff = (props) => {

    const [selectedMenu, setSelectedMenu] = useState(1)
    const [isAddUser, setAddUser] = useState(false)

    useEffect(() => {
        props.fetchConfigurationList()
    }, []);
    const usersList = [
        { id: "1", name: 'Raja', 'phoneNumber': "7028556731", role: 'Owner' },
        { id: "2", name: 'Ramu', 'phoneNumber': "7588587980", role: 'staff' }
    ]

    const serviceList = [
        { id: "1", name: 'Raja', role: 'Owner', status: "active" },
        { id: "2", name: 'Ramu', role: 'staff', status: "active" }
    ]

    const roleList = [
        { id: "1", name: 'Raja', role: 'Owner', status: "active" },
        { id: "2", name: 'Ramu', role: 'staff', status: "active" }
    ]

    const data = [
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
    const handleSelectedMenu = () => {
        var data = {}
        if (selectedMenu == 2) {
            return <div> Current Status</div>
        } else if (selectedMenu == 3) {
            return <Report />
        } else if (selectedMenu == 4) {
            data = {
                editAction: editUser,
                deleteAction: () => { },
                addAction: addUser
            }
            return <Staff selectedLocation = {props.selectedLocation} {...data}/>
        } else if (selectedMenu == 5) {
            data = {
                title: "Services List",
                data: serviceList,
                editAction: () => { },
                deleteAction: () => { },
                addText: "Add Service",
                addAction: addUser
            }
            return <EditableTable {...data} />
        } else if (selectedMenu == 6) {
            data = {
                title: "Roles List",
                data: roleList,
                editAction: () => { },
                deleteAction: () => { },
                addText: "Add Role",
                addAction: addUser
            }
            return <EditableTable {...data} />
        } else {
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

    const editUser = () => {
        setAddUser(true)
        handleRightPanel()
    }
    const handleRightPanel = () => {
        if (isAddUser) {
            return renderAddRole()
        } else {
            return handleSelectedMenu()
        }
    }

    const addUser = () => {
        setAddUser(true)
        handleRightPanel()
        
    }
    const handleMenuSelection = (value) => {
        setAddUser(false)
        setSelectedMenu(value)
        return handleRightPanel()
    }

    const getLocationsData = () => {
        const options = props.configurationList['divyasree_campus']
        console.log("[Home.js] options :: ", options)
        let data = []
        if (options != null && options != undefined) {
            let optionsArray = Object.keys(options)
            console.log("[Home.js] optionsArray :: ", optionsArray)

            /*for(campus in options){
                optionsArray.push(campus)
            }*/

            for (var i = 0; i < optionsArray.length; i++) {
                data.push(optionsArray[i])
            }
            console.log("[home.js] defaultLocation :: ",{'name':optionsArray[0], 'id': options[optionsArray[0]].id})
        }
        console.log("[Home.js] data :: ", data)
        
        return data;
    }

    const handleLocationSelection = (location) =>{
        const options = props.configurationList['divyasree_campus']
        props.selectLocation({'name':location, 'id': options[location].id})
    }

    const configHeader = {
        title: "Home",
        isBack: false,
        emitEvent: () => { },
        isLoggedIn: true,
        logoutEvent: () => { },
        selectedLocation: props.selectedLocation.name,
        locations: getLocationsData(),
        handleLocationSelection : handleLocationSelection
    }

    const configMenu = {
        menuItems: [{ id: 1, text: "Dashboard" },
        { id: 3, text: "Report" },
        { id: 4, text: "Manage Users" },
        { id: 5, text: "Manage Listing" },
        { id: 6, text: "Roles" }],
        onSelectedMenu: handleMenuSelection
    }

    //     useEffect(() => {
    //         handleSelectedMenu()
    // }, []);
    console.log("[Home.js]  configurationList :: ", props.configurationList)
    return (

        <div className='Home'>
            <Header {...configHeader} />
            <div className='main'>
                <div className='leftPanel'>
                    <CustomDrawer {...configMenu} />
                </div>
                <div className='rightPanel'>
                    <AddUser />
                </div>
            </div>
        </div>
    )
}

AddStaff.propTypes = {
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchConfigurationList: () => dispatch(fetchConfigurationList()),
        selectLocation : (locationDtls) => dispatch(selectLocation(locationDtls))
    }
}

const mapStateToProps = state => {
    return {
        configurationList: state.configuration.configurationList,
        account: state.account,
        selectedLocation: state.account.selectedLocation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStaff);