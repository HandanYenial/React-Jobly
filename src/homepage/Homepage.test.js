import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Homepage from "./Homepage";
import { UserProvider } from "../testUtils";


//UserProvider : it will provide the context for the user
//MemoryRouter : it will provide the context for the router
//Home : it will render the component

//smoke test
it("renders without crashing" , function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <Homepage/>
            </UserProvider>
        </MemoryRouter>
    );
});

it("matches snapshot" , function(){
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Homepage/>
            </UserProvider>
        </MemoryRouter>
    );
    expect (asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out" , function(){
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <Homepage/>
            </UserProvider>
        </MemoryRouter>
    );
    expect (asFragment()).toMatchSnapshot();

});