import React from "react";
import { useState, useNavigate } from "react-router-dom";
import Alert from "../common/Alert";

//Login form for user login 
//1. Show the login form
//2. Update state on form changes
//3. Handle form submission
//4. Call login function prop
//5. Redirect to companies page if the login is successful.

function LoginForm({ login }){ //login is a function prop
    const navigate = useNavigate(); //useNavigate hook to redirect
    const [formData , setFormData] = useState({ username: "" , password: ""}); //initial state will be empty strings
    const[formErrors , setFormErrors] = useState([]); 

    console.debug(
        "LoginForm",
        "login=" , typeof login,
        "formData=" , formData,
        "formErrors=" ,formErrors,
    );

    //Update state on form changes
    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(form => ({...form, [name]:value}));
    }

    return (
        <div className = "LoginForm">
            <div className = "container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className = "mb-3">Log In</h3>

                <div className = "card">
                    <
                </div>
        </div>
    )

}
