import React from "react";
import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import JobCardList from "../jobs/JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";

/** 1 .show details of a company
 *  2. it is rendered by Routes : /companies/:handle
 *  3. it renders JobCardList : it will show jobs in that company
 *  4. it renders LoadingSpinner : it will show loading spinner while waiting for API
 *  5. it renders ErrorAlert : it will show error alert if there is an error
 * 
 */

function CompanyDetail(){ 
    const { handle } = useParams();// get the handle from the URL
    console.debug("CompanyDetail" , "handle=", handle); 

    const [company , setCompany] = useState(null); 
    useEffect(
        function getCompanyAndJobsForUser(){ 
            async function getCompany(){
                setCompany(await JoblyApi.getCompany(handle));
            }
            getCompany();
        }, [handle]);

        if(!company) return <LoadingSpinner/>;

        return(
            <div className = "CompanyDetail col-md-8 offset-md-2">
                <h4>{company.name}</h4>
                <p>{company.description}</p>
                <JobCardList jobs = {company.jobs}/>
            </div>
        );    
}
        
export default CompanyDetail;
    
