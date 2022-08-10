import React,{ useState } from "react";
import {useHistory} from "react-router-dom";
import Alert from "../common/Alert";

/**Signup form for a new user
 * 1. show the signup form (username, password, first name, last name, email)
 * 2. update state on form changes
 * 3. handle form submission
 * 4. call signup function prop
 * 5. redirect to companies page if signup is successful
 */

function SignupForm({ signup }){
    const history = useHistory();
    const [formData, setFormData] = useState({username: "" , password: "", firstName:"" , lastName:"", email:""});
    const [formErrors, setFormErrors] = useState([]);

    console.debug(
        "SignupForm",
        "signup=" , typeof signup,
        "formData=" , formData,
        "formErrors=" ,formErrors,
    );

//handle form submission
    async function handleSubmit(evt){
        evt.preventDefault(); //prevent page reload
        let result = await signup(formData); //call signup function prop
        if(result.success){
            history.push("/companies"); //redirect to companies page
        } else {
            setFormErrors(result.errors); 
        }
    }
    
    //Update state on form changes
    function handleChange(evt){
        const {name,value} = evt.target;
        setFormData(form => ({...form , [name]:value}));
    }

    return(
        <div className = "SignupForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className = "mb-3">Sign Up</h3>
                <div className = "card">
                    <div className = "card-body">
                        <form onSubmit = {handleSubmit}>
                            <div className = "form-group">
                                <label>Username</label>
                                <input
                                      name = "username"
                                      className = "form-control"
                                      value = {formData.username}
                                      onChange ={handleChange}
                                />
                            </div>
                            <div className = "form-group">
                                <label>Password</label>
                                <input
                                      name = "password"
                                      type = "password"
                                      className = "form-control"
                                      value = {formData.password}
                                      onChange = {handleChange}
                                />
                            </div>
                            <div className = "form-group">
                                <label>First Name</label>
                                <input
                                      name = "firstName"
                                      className = "form-control"
                                      value = {formData.firstName}
                                      onChange = {handleChange}
                                />
                            </div>
                            <div className = "form-group">
                                <label>Last Name</label>
                                <input
                                      name = "lastName"
                                      className = "form-control"
                                      value = {formData.lastName}
                                      onChange = {handleChange}
                                />
                            </div>
                            <div className = "form-group">
                                <label>Email</label>
                                <input 
                                      name = "email"
                                      type = "email"
                                      className = "form-control"
                                      value = {formData.email}
                                      onChange = {handleChange}
                                />
                            </div>

                            {formErrors.length
                                ? <Alert type = "danger" messages = {formErrors}/>
                                : null
                            }

                            <button 
                                   type="submit" 
                                   className="btn btn-primary float-right" 
                                   onSubmit={handleSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;