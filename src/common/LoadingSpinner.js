import React from "react";
import "./LoadingSpinner.css";

/** Renders a loading spinner.
 * will be used by the components that need data from the Api
 */

function LoadingSpinner(){
    return(
        <div className = "LoadingSpinner">
            Loading...
        </div>
    );
}

export default LoadingSpinner;

