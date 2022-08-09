import React from "react";
import {useContext} from "react";
import {Link} from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";

/**Homepage of the site
 * 1. Shows welcome message
 * 2. Shows login and signup buttons
 * 3. Shows links to companies and jobs pages
 * 4. Shows link to profile page if logged in
 * 5. Shows link to log out if logged in
 * 6.Routed at "/"
 */

function Homepage(){
    const {currentUser} = useContext(UserContext); //get the current user from context
    //“useContext” hook is used to create common data that can be accessed throughout the 
    //component hierarchy without passing the props down manually to each level. 
    //Context defined will be available to all the child components without involving “props”.
    console.debug("Homepage", "currentUser=", currentUser);

    return(
        <div className = "Homepage">
            <div className = "container text-center">
                <h1 className = "mb-4 font-weight-bold">Jobly</h1>
                <p className = "lead">All the jobs in one, convenient place.</p>
                {currentUser
                           ? (
                            <h2> Welcome back {currentUser.firstName || currentUser.username}!</h2>
                             )
                           :
                             (
                                <p>
                                    <Link className = "btn btn-primary font-weight-bold mr-3" 
                                          to = "/login">
                                            Log in
                                    </Link>
                                    <Link className = "btn btn-primary font-weight-bold"
                                          to = "/signup">
                                            Sign up
                                          </Link>
                                </p>
                             )}
            </div>
        </div>
    );
}

export default Homepage;