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

    handleSelectedMenu = () => {
    var data = {}
    if (this.state.selectedMenu == 2) {
        // data = {
        //     title: "Users List",
        //     data: this.state.usersList,
        //     editAction: this.renderAddUser,
        //     deleteAction: () => {},
        //     addText: "Add User",
        //     addAction: this.renderAddUser,
        // }
        return <div> Current Status</div>
    } else if (this.state.selectedMenu == 3) {
        // data = {
        //     title: "Services List",
        //     data: this.state.usersList,
        //     editAction: () => {},
        //     deleteAction: () => {},
        //     addText: "Add Service",
        //     addAction: this.renderAddRole
        // }
        return <div> DashBoard</div>
    } else if (this.state.selectedMenu == 4) {
        // data = {
        //     title: "Roles List",
        //     data: this.state.roleList,
        //     editAction: () => {},
        //     deleteAction: () => {},
        //     addText: "Add Role",
        //     addAction: this.renderAddRole
        // }  
        // return <EditableTable {...data} />
        return <div> DashBoard</div>
    } else {
        return <div> DashBoard</div>
    }
    
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
            menuItems: [{id: 1, text: " Dashboard"},{id: 2, text: "Current Status"},{id: 3, text: "Report"},{id: 4, text: " Manage Users"}, {id: 5,text:"Manage Listing"}, {id: 6,text:"Roles"}],
            onSelectedMenu: (value) => {
                console.log("this.state.selectedMenu",this.state.selectedMenu)
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
                    {console.log("this.state.selectedMenu",this.state.selectedMenu)}
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