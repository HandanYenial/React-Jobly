import React from "react";
import {useContext} from "react";
import {Link, NavLink} from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";

/**Navigation bar for site
 * 1. Shows up in every page
 * 2. If user is logged in, shows links to companies, jobs, profile, and logout
 * 3. If user is logged out, shows links to login and signup
 * 4. If user is logged in, shows a welcome message
 * 5. Rendered by App
 */

function Navigation({logout}){
    const {currentUser} = useContext(UserContext);
    console.debug("Navigation" , "currentUser=" , currentUser);

    function loggedInNav(){
        return(
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <NavLink className = "nav-link" to = "/companies">
                        Companies
                    </NavLink>
                </li>

                <li className="nav-item mr-4">
                    <NavLink className = "nav-link" to = "/jobs">
                        Jobs
                    </NavLink>
                </li>

                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/profile">
                        Profile
                    </NavLink>
                </li>

                <li className="nav-item mr-4">
                    <Link className = "navLink" to = "/" onClick ={logout}>
                        Log out {currentUser.firstName || currentUser.username}
                    </Link>
                </li>
            </ul>
        );
    }

    function loggedOutNav(){
        return(
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/login">
                        Login
                    </NavLink>
                </li>

                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/signup">
                        Signup
                    </NavLink>
                </li>
            </ul>
        );
    }

    return(
        <nav className="Navigation navbar navbar-expand-md">
            <Link className="navbar-brand" to="/">
                Jobly
            </Link>
            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    );
    }

export default Navigation;