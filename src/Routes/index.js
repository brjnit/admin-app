import React, { useState } from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import Home from "../Screen/Home";
import Login from "../Screen/Login";
import { useSelector } from "react-redux";
import Loader from '../Component/loader';
import AddUser from "../Component/addUser";
import AddRole from "../Component/addRole";
const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() => auth ?
                (<Component />) :
                (<Redirect to="/"/>)} />
    )
}

const Routes = () => {
    const [isAuthenticated, authenticate] = useState(true)
    const isLaoding = useSelector(state => state.loading.showLoader);
    if (isLaoding) {
            return (<Loader/>)
    }
    return (
        <Switch>
            <Route exact path="/" component={Login}/>
            <ProtectedRoute exact path="/home" component={Home} auth={isAuthenticated} />
            <ProtectedRoute exact path="/home/adduser" component={AddUser} auth={isAuthenticated} />
            <ProtectedRoute exact path="/home/addrole" component={AddRole} auth={isAuthenticated} />
        </Switch>
    )
}
export default withRouter(Routes)