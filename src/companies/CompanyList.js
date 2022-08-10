import React, { useEffect, useState} from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api"
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";

/**1. show list of companies from api
 * 2. it is rendered by Routes : /companies
 * 3. it renders SearchForm : it will show search form
 * 4. it renders CompanyCard : it will show company card
 * 5. it renders LoadingSpinner : it will show loading spinner while waiting for API
 * 
 */

function CompanyList(){
    console.debug("CompanyList");

    const [companies , setCompanies] = useState(null);

    useEffect(
        function getCompaniesOnMount(){
            console.debug("CompanyList useEffect getCompaniesOnMount");
            search();
        }, []);

    //When searchform is submitted, reload the companies
    async function search(name){//name is the search term - search by company name
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }
    if(!companies) return <LoadingSpinner/>;

    return(
        <div className = "CompanyList col-md-8 offset-md-2">
            <SearchForm searchFor = {search}/>
            {companies.length
                             ? (<div className= "CompanyList-list">
                                    {companies.map(company =>(
                                        <CompanyCard
                                            key = {company.handle}
                                            handle = {company.handle}
                                            name = {company.name}
                                            description = {company.description}
                                            logoUrl = {company.logoUrl}
                                        />
                                    ))}
                               </div>)
                             : (<p className = "lead">Sorry, no results were found!</p>)
            }
        </div>
    );
}

export default CompanyList;