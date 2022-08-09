import React from "react";
import { Link } from "react";
import "./CompanyCard.css";

/** 1. Show information about a company
 *  2. It is rendered by CompanyList to show a "card" for each company
 */

function CompanyCard({ name, description, logoUrl, handle }){
    console.debug("CompanyCard" , "logoUrl");

    return(
        <Link className="CompanyCard card" to={`/companies/${handle}`}>
            <div className = "class-body">
                <h6 className = "card-title">
                    {name}
                    {logoUrl && <img src={logoUrl} alt={name} className="float-right ml-5" />}
                </h6>
                <p><small>{description}</small></p>
            </div>
        </Link>
    );
}

export default CompanyCard;