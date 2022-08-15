import React from "react";
import { render } from "@testing-library/react";
import JobCard from "./JobCard";
import { UserProvider } from "../testUtils";

//UserProvider: it will provide the context for the user

//smoke test
it ("renders without crashing" , function(){
    render(
        <UserProvider>
            <JobCard/>
        </UserProvider>
    );
});

//snapshot test
it ("matches snapshot" , function(){
    let item = {
        title: "CEO",
        salary : 100000,
        equity : 10
    };
    const { asFragment } = render(
        <UserProvider>
            <JobCard item={item}/>
        </UserProvider>
    );
    expect (asFragment()).toMatchSnapshot();
});