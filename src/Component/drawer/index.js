import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";


const drawerWidth = "200px";
const gradient = "linear-gradient(180deg , #4dd0e1, transparent)"

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        backgroundColor :"white",
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
    const { menuItems, onSelectedMenu } = props
    
    

    const onClickListItem = (value) => () => {
        onSelectedMenu(value)
    }

    return (
                <div className={classes.drawerContainer}>
                    <List  >
                        {menuItems != null && menuItems.map(item => (
                            <ListItem button key={item.id} onClick={onClickListItem(item.hash)}>
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
