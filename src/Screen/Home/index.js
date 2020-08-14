import React, { Component } from 'react'
import './styles.scss'
import Header from '../../Component/header';
import { Divider, TextField, Drawer } from '@material-ui/core';
import EditableTable from '../../Component/table';
import AddRole from '../../Component/addRole';
import LeftPanel from '../../Component/leftPanel';
import CustomDrawer from '../../Component/drawer';
import AddUser from '../../Component/addUser';

class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selectedMenu: 1 ,
            usersList : [
                { id: "1", name: 'Raja', role: 'Owner', status: "active" },
                { id: "2", name: 'Ramu', role: 'staff', status: "active" }
            ],
            
            serviceList: [
                { id: "1", name: 'Raja', role: 'Owner', status: "active" },
                { id: "2", name: 'Ramu', role: 'staff', status: "active" }
            ],
            
             roleList: [
                { id: "1", name: 'Raja', role: 'Owner', status: "active" },
                { id: "2", name: 'Ramu', role: 'staff', status: "active" }
            ]
        }   
    }

    data = [
        { id: "1", name: 'Raja', role: 'Owner', status: "active" },
        { id: "2", name: 'Ramu', role: 'staff', status: "active" }
    ]

   
   

 onClickListItem = (value) => () => {
    console.log("target", value)
    this.state.selectedMenu = value
}

    handleSelectedMenu() {
    var data = {}
    if (this.state.selectedMenu == 1) {
        data = {
            title: "Users List",
            data: this.state.usersList,
            editAction: this.renderAddUser,
            deleteAction: () => {},
            addText: "Add User",
            addAction: this.renderAddUser,
        }
    } else if (this.state.selectedMenu == 2) {
        data = {
            title: "Services List",
            data: this.state.usersList,
            editAction: () => {},
            deleteAction: () => {},
            addText: "Add Service",
            addAction: this.renderAddRole
        }
         
    } else if (this.state.selectedMenu == 3) {
        data = {
            title: "Roles List",
            data: this.state.roleList,
            editAction: () => {},
            deleteAction: () => {},
            addText: "Add Role",
            addAction: this.renderAddRole
        }  
    }
    return <EditableTable {...data} />
}

componentDidMount () {
    console.log("selectedMenu", this.state.selectedMenu)
    this.handleSelectedMenu()
}


    render() {
       
        const configHeader = {
            title: "Home",
            isBack: false,
            emitEvent: () => { },
            isLoggedIn: true,
            logoutEvent: () => { }
        }

       const configMenu = {
            menuItems: [{id: 1, text: " Manage Users"}, {id: 2,text:"Manage Listing"}, {id: 3,text:"Roles"}],
            onSelectedMenu: (value) => {
               this.state.selectedMenu = value
            }
        } 
        return (
            <div className = 'Home'>
                <Header {...configHeader}/>
                <div className = 'main'> 
                    <div className='leftPanel'> 
                     <CustomDrawer {...configMenu}/>
                    </div>
                    <div className='rightPanel'> 
                    {this.handleSelectedMenu()}
                    </div>
                </div>
                
               
            </div>
        )
    }
}

Home.propTypes = {

}

export default Home;