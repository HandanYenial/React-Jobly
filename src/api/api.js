/**Many of the components will need to talk to the backend (the company detail page will
 * need to load data about the company, for example).
It will be messy and hard to debug if these components all have AJAX calls buried inside of them.
Instead, make a single JoblyAPI class, which will have helper methods for centralizing 
this information. This is conceptually similar to having a model class to interact with the  
database, instead of having SQL scattered all over your routes. */

import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 */

class JoblyApi {
  //The token for interaction with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read 
    //this code for this project.

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }
 // Get companies by search team: name
   static async getCompanies(name){
    let res = await this.request("companies" , {name});
    return res.companies;
   }

   //Get current user
   static async getCurrentUser(username){
    let res = await this.request(`users/${username}`);
    return res.user;
   }

   //Get jobs by search:title
   static async getJobs(title){
    let res = await this.request("jobs" , {title});
    return res.jobs;
   }

   //Apply for a job
   static async applyToJob(username, id){
    let res = await this.request(`users/${username}/jobs/$id` , {} , "post");
    return res;
   }

   //Get token for login
   static async login(data){
    let res = await this.request(`auth/token` , data , "post");
    return res.token;
   }

   //Resgister new user(sign up)
   static async signup(data){
    let res = await this.request(`auth/register` , data , "post");
    return res.token;
   }

   //Save user profile
   static async saveProfile(username , data){
    let res = await this.request(`users/${username}` , data , "patch");
    return res.user;
   }

}

//For now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
