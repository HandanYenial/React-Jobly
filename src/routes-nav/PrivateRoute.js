import React from "react"
import {useContext} from "react"
import {Route, Redirect} from "react-router-dom"
import UserContext from "../auth/UserContext"

/***
 * Private Route
 * 1. Renders a route if user is logged in
 * 2. If user is not logged in, redirects to login page
 * 3. 
 */

function PrivateRoute({exact , path , children}){
    const { currentUser } = useContext(UserContext);

    console.debug(
        "PrivateRoute", "exact=", exact, "path=", path, "currentUser=", currentUser,
    );

    if (!currentUser){
        return <Redirect to = "/login"/>
    }

    return(
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
}

export default PrivateRoute;