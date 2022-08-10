import React from 'react';
import { useState } from "react";
import "./SearchForm.css";

/**1. Show a search form with a text input and a submit button.
 * 2. It will appera both in company page and jobs page
 * 3. 
 * 
 * 
 */

function SearchForm({ searchFor }) { 
    console.debug("SearchForm" , "searchFor=" , typeof searchForm);

    const [searchTerm , setSearchTerm] = useState("");

    //1. Handle form submit: tell parent to filter
    //The trim() method removes whitespace from both ends of a string and returns a new string,
    // without modifying the original string. 
    function handleSubmit(evt){
        evt.preventDefault();
        searchFor(searchTerm.trim() || undefined);//take care of empty search term
        setSearchTerm(searchTerm.trim());
    }

    //2. Handle typing in search box
    function handleChange(evt){
        setSearchTerm(evt.target.value);
    }

  return (
    <div className = "SearchForm">
        <form className = "form-inline" onSubmit = {handleSubmit}>
            <input
                  className = "form-control form-control-lg flex-grow-1"
                  name = "searchTerm"
                  placeholder = "Enter search term ..."
                  value = { searchTerm }
                  onChange = {handleChange}
            />
            <button type = "submit"
                    className = "btn btn-lg btn-primary">
                        Search
            </button>
        </form>
    </div>
  );
}

export default SearchForm;