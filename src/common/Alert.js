import React from "react";

/**Alert component to show bootstrap-style alerts
 * Used in Loginform , SignupForm, ProfileForm
 * 
 */

function Alert({type="danger" , messages = []}){ //default type is danger and messages is the array of error messages in other components
    console.debug(
        "Alert",
        "type=" ,type,
        "messages=" , messages);
        
        return(
            <div className = {`alert alert-${type}`} role = "alert">
                {messages.map(error => (
                    <p className = "mb-0 small" key = {error}>
                        {error}
                    </p>
                ))}
            </div>
        );
}

export default Alert;