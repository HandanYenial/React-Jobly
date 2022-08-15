import React from "react";
import {useState, useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage"; //a custom hook that uses localStorage to store a token
import Navigation from "./routes-nav/Navigation"; //a component that renders a navigation bar
import Routes from "./routes-nav/Routes"; //a component that renders routes
import LoadingSpinner from "./common/LoadingSpinner"; //a component that renders a loading spinner
import JoblyApi from "./api/api"; //a class that interacts with the Jobly API
import UserContext from "./auth/UserContext"; //a context that stores the current user
import jwt from "jsonwebtoken"; //a library that decodes a JWT



//Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

//App function that renders the entire app
function App(){
  const [infoLoaded, setInfoLoaded] = useState(false); //state variable that tracks whether the app has loaded
  const [applicationIds , setApplicationIds] = useState(new Set([])); //state variable that stores the IDs of the jobs that the user has applied to
  const [currentUser, setCurrentUser] = useState(null); //state variable that stores the current user
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID); //state variable that stores the token

  console.debug(
                "App",
                "infoLoaded=" , infoLoaded,
                "currentUser=" , currentUser,
                "token=" , token,
 );

   // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(
    function loadUserInfo(){
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser(){
        if(token){
          try{
            let {username} = jwt.decode(token);
            //put the token to the Api class so it can use it to call the Api
            JoblyApi.token = token //set the token in the Api class
            let currentUser = await JoblyApi.getCurrentUser(username); //get the current user
            setCurrentUser(currentUser); //set the current user
            setApplicationIds(new Set(currentUser.applications)); //set the IDs of the jobs that the user has applied to
          } catch (err){
            console.error("App loadUserInfo: problem loading", err); //if there is an error, log it
            setCurrentUser(null);//set the current user to null
          }
        }
        setInfoLoaded(true); //set the infoLoaded state variable to true
      }
         // set infoLoaded to false while async getCurrentUser runs; once the
        // data is fetched (or even if an error happens!), this will be set back
       // to false to control the spinner.
       setInfoLoaded(false);
       getCurrentUser();//call the getCurrentUser function
    }, [token]);

    //function that logs the user out
    function logout(){
      setCurrentUser(null); //set the current user to null
      setToken(null); //set the token to null
    }

    //Function to signup the user
    //Automatically logs the user in after signing up
    
    async function signup(signupData){
      try{
        let token = await JoblyApi.signup(signupData); //
        setToken(token); //set the token
        return {success:true};
      }catch(errors){
        console.error("signup failed", errors);
        return {success:false,errors};
      }
    }

    //Function to login the user
    async function login(loginData){
      try{
        let token = await JoblyApi.login(loginData);
        setToken(token);
        return {success:true};
      } catch(errors){
        console.error("login failed" , errors);
        return { success: false, errors};
      }
    }

    //Function to check if the job has applied 
    function hasAppliedToJob(id){ //takes in the ID of the job
      return applicationIds.has(id); //returns true if the job has been applied to
    }

    //Function to apply to a job
    function applyToJob(id){
      if (hasAppliedToJob(id)) return;//if the job has been applied to, return
      setApplicationIds(new Set([...applicationIds, id])); //add the job to the set of jobs that the user has applied to
    }

    if(!infoLoaded) return <LoadingSpinner/>; //if the info has not been loaded, render the loading spinner

    return(
      <BrowserRouter>
         <UserContext.Provider
             value = {{currentUser, setCurrentUser, hasAppliedToJob, applyToJob}}>
              <div className="App">
                <Navigation logout = {logout}/>
                <Routes login = {login} signup = {signup}/>
              </div>
             </UserContext.Provider>
      </BrowserRouter>
    );
}
  

export default App;
