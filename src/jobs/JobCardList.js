import React from "react";
import JobCard from "./JobCard";

/**1. Show list of jobcards
 * 2. Rendered by JobList : parent component
 * so JobList---JobCardList---JobCard
 * CompanyDetail---JobCardList---JobCard
 */

function JobCardList({ jobs, apply }){
    console.debug("JobCardList" , "job=" , jobs);

    return(
        <div className="JobCardList">
            {jobs.map(job =>(
                <JobCard
                    key={job.id}
                    id = {job.id}
                    title = {job.title}
                    salary = {job.salary}
                    equity = {job.equity}
                    companyName = {job.companyName}
                />
            ))}
        </div>
    );
}

export default JobCardList;