import React, { useState } from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import Home from "../Screen/Home";
import Login from "../Screen/Login";
import { useSelector } from "react-redux";
import Loader from '../Component/loader';
import AddStaff from "../Screen/AddStaff";
import AddRole from "../Component/addRole";
import ManageServices from '../Screen/ManageServices'
import {connect} from 'react-redux'

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() => auth ?
                (<Component />) :
                (<Redirect to="/"/>)} />
    )
}

const Routes = (props) => {
    //const isAuthenticated = props.isAuthenticated;
    const isAuthenticated = true;
    const isLaoding = useSelector(state => state.loading.showLoader);
    if (isLaoding) {
            return (<Loader/>)
    }
    return (
        <Switch>
            <Route exact path="/" component={Login}/>
            <ProtectedRoute exact path="/home" component={Home} auth={isAuthenticated} />
            <ProtectedRoute exact path="/home/AddStaff" component={AddStaff} auth={isAuthenticated} />
            <ProtectedRoute exact path="/home/ManageServices" component={ManageServices} auth={isAuthenticated} />
            <ProtectedRoute exact path="/home/addrole" component={AddRole} auth={isAuthenticated} />
        </Switch>
    )
}

const mapStateToProps = state =>{
    return {
        isAuthenticated : state.auth.isAuthenticated
    }
}
export default withRouter(connect(mapStateToProps,null)(Routes))