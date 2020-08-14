import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Header from "../header";
import EditableTable from "../table";
import AddRole from '../addRole';
import AddUser from "../addUser";
import { red } from "@material-ui/core/colors";
import { BorderClear, BorderColor } from "@material-ui/icons";
import { Redirect } from "react-router-dom";
import Login from "../../Screen/Login";

const drawerWidth = "200px";
const gradient = "linear-gradient(180deg , #4dd0e1, transparent)"

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        //backgroundColor :"white",
        background: gradient,
        backdropFilter:  "saturate(10%) ",
        borderWidth: "2px",
        borderRadius: "5px"
        
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
       // alignItems: gradient,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        backdropFilter:  "saturate(10%) ",
        borderWidth: "2px",
        borderRadius: "5px"
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerContainer: {
        overflow: "auto",
        borderWidth: "2px",
        borderRadius: "5px",
        borderColor: "green",
       // backdrop-filter: saturate(180%) blur(20px);
        //background: "red",
    },
    // content: {
    //     flexGrow: 1,
    //     padding: theme.spacing(20),
    //     textAlign: "center",
    //     backdropFilter:  "saturate(100%) ",
    //     borderWidth: "2px",
    //     borderRadius: "5px"
    //     //background: gradient,
    // },
    addUser: {
      textAlign : "center",
      //borderRadius: "20px",
      background: "linear-gradient(transparent,#fff)",
      padding: theme.spacing(5),
      //display: "inline-block",
      //width: "60%",
      boxShadow: "0px 1px 0px -1px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
     // box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12);

    }
}));

export default function CustomDrawer(props) {
    const classes = useStyles();
    const { menuItems, onSelectedMenu, isBack, emitEvent, isLoggedIn, logoutEvent } = props
    const [selectedMenu, setMenu] = useState(1)
    const [isAddUser, setAddUser] = useState(false)
    const [isAddRole, setAddRole] = useState(false)
    const configHeader = {
        title: "Home",
        isBack: false,
        emitEvent: () => { },
        isLoggedIn: true,
        logoutEvent: () => { }
    }

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

    const onClickListItem = (value) => () => {
        onSelectedMenu(value)
        setMenu(value)
    }

    const renderTable = (value) => {
        console.log("value", value)

        var data = {}
        if (value == 1) {
            data = {
                title: "Users List",
                data: usersList,
                editAction: renderAddUser,
                deleteAction: () => {},
                addText: "Add User",
                addAction: renderAddUser,
            }
        } else if (value == 2) {
            data = {
                title: "Services List",
                data: usersList,
                editAction: () => {},
                deleteAction: () => {},
                addText: "Add Service",
                addAction: renderAddRole
            }
             
        } else if (value == 3) {
            data = {
                title: "Roles List",
                data: roleList,
                editAction: () => {},
                deleteAction: () => {},
                addText: "Add Role",
                addAction: renderAddRole
            }  
        }
        return <EditableTable {...data} />
    }

    const configAddUser = {
        placeHolder: "User name",
        value: "",
        onTextChange: (value) => {}
    }
    const renderAddUser = () => {
        setAddUser(true)
        return <AddUser {...configAddUser}/>
    }

    const renderAddRole = () => {
        setAddRole(true)
        return <AddRole {...configAddUser}/>
    }

    const renderEditUser = () => {
        setAddUser(true)
        return <AddUser {...configAddUser}/>
    }

    const renderEditRole= () => {
        setAddRole(true)
        return <AddRole {...configAddUser}/>
    }

    const renderMain = (value) => {
        if (isAddUser) {
           return renderAddUser()
        } else if (isAddRole) {
            return renderAddRole()
        } else {
            return  renderTable(value)
        }

    }

    // useEffect(() => {
    //     renderMain(selectedMenu)
    // }, []);

    return (
                <div className={classes.drawerContainer}>
                    <List  >
                        {menuItems != null && menuItems.map(item => (
                            <ListItem button key={item.id} onClick={onClickListItem(item.id)}>
                                <ListItemIcon  >
                                    {item.id % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>

                        ))}
                    </List>
                    <Divider />
                </div> 
    );
}

CustomDrawer.propTypes = {
    menuItems: PropTypes.array,
    onSelectedMenu: PropTypes.number,
    isBack: PropTypes.bool,
    emitEvent: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    logoutEvent: PropTypes.func
}
