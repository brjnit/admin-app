import React, { useState, useEffect } from 'react'
import './styles.scss'
import Header from '../../Component/header';
import { Divider, TextField, Drawer } from '@material-ui/core';
import EditableTable from '../../Component/table';
import AddRole from '../../Component/addRole';
import LeftPanel from '../../Component/leftPanel';
import CustomDrawer from '../../Component/drawer';
import AddUser from '../../Component/addUser';
import Dashboard from '../../Component/dashboard';
import Report from '../../Component/report';

const Home = (props) => {

        const [selectedMenu, setSelectedMenu] = useState(1)
        const [isAddUser, setAddUser] = useState(false)
    
       const usersList = [
            { id: "1", name: 'Raja', role: 'Owner', status: "active" },
            { id: "2", name: 'Ramu', role: 'staff', status: "active" }
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

    const renderAddRole =(input) => {
        if (isAddUser) {
            if (input == null ) { 
                return <AddUser/>
            } else {
                const [name, role] = input
                const configAddUser = {
                    input: {
                        userName: name,
                        role: role
                    }

                }
                return <AddUser {...configAddUser}/>
            }
            
        }  
    } 
   const  handleSelectedMenu = () => {
    var data = {}
    if (selectedMenu == 2) {
        return <div> Current Status</div>
    } else if (selectedMenu == 3) {
        return <Report/>
    } else if (selectedMenu == 4) {
        data = {
            title: "User List",
            data: usersList,
            editAction: editUser,
            deleteAction: () => {},
            addText: "Add Role",
            addAction: addUser
        }  
        return <EditableTable {...data} />
    } else if (selectedMenu == 5) {
        data = {
            title: "Services List",
            data: serviceList,
            editAction: () => {},
            deleteAction: () => {},
            addText: "Add Service",
            addAction: addUser
        }
        return <EditableTable {...data} />
    } else if (selectedMenu == 6) {
        data = {
            title: "Roles List",
            data: roleList,
            editAction: () => {},
            deleteAction: () => {},
            addText: "Add Role",
            addAction: addUser
        }  
        return <EditableTable {...data} />
    }else {
       const config = {
           data: [{
            title: "Dashboard",
            subTitle: "status",
            value: "124"
           },{
            title: "Report",
            subTitle: "status",
            value: "124"
           },{
            title: "Current",
            subTitle: "status",
            value: "124"
           }]  
        }
        return <Dashboard {...config}/>
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
   return  handleRightPanel()
 }


        const configHeader = {
            title: "Home",
            isBack: false,
            emitEvent: () => { },
            isLoggedIn: true,
            logoutEvent: () => { }
        }

       const configMenu = {
            menuItems: [{id: 1, text: "Dashboard"},
                        {id: 2, text: "Current Status"},
                        {id: 3, text: "Report"},
                        {id: 4, text: "Manage Users"}, 
                        {id: 5, text: "Manage Listing"}, 
                        {id: 6, text: "Roles"}],
            onSelectedMenu: handleMenuSelection
        } 

    //     useEffect(() => {
    //         handleSelectedMenu()
    // }, []);
        return (
            <div className = 'Home'>
                <Header {...configHeader}/>
                <div className = 'main'> 
                    <div className='leftPanel'> 
                     <CustomDrawer {...configMenu}/>                    
                    </div>
                    <div className='rightPanel'> 
                        {handleRightPanel()}    
                    </div>
                </div>  
            </div>
        )  
}

Home.propTypes = {

}

export default Home;