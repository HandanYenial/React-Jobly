import React , {useState} from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

//Login form for user login 
//1. Show the login form
//2. Update state on form changes
//3. Handle form submission
//4. Call login function prop
//5. Redirect to companies page if the login is successful.

function LoginForm({ login }){ //login is a function prop
    const history = useHistory(); 
    const [formData , setFormData] = useState({ username: "" , password: ""}); //initial state will be empty strings
    const[formErrors , setFormErrors] = useState([]); 

    console.debug(
        "LoginForm",
        "login=" , typeof login,
        "formData=" , formData,
        "formErrors=" ,formErrors,
    );

    //handle form submission
    async function handleSubmit(evt){
        evt.preventDefault(); //prevent page reload
        let result = await login(formData); //call login function prop
        if(result.success){
            history.push("/companies"); //redirect to companies page
        } else {
            setFormErrors(result.errors);
        }
    }

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
                    < div className = "card-body">
                        <form onSubmit = { handleSubmit }>
                            <div className = "form-group">
                                <label>Username</label>
                                <input
                                      name = "username"
                                      className = "form-control"
                                      value = {formData.username}
                                      onChange = {handleChange}
                                      autoComplete = "username"
                                      required
                                />
                            </div>
                            <div className = "form-group">
                                <label> Password </label>
                                <input
                                      type = 'password'
                                      name = "password"
                                      className = "form-control"
                                      value = {formData.password}
                                      onChange = {handleChange}
                                      autoComplete = "current-password"
                                      required
                                />
                            </div>

                            {formErrors.length
                                ? <Alert type ="danger" messages = {formErrors} />
                                : null
                            }

                            <button className="btn btn-primary float-right" onSubmit={handleSubmit}>Submit</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;

