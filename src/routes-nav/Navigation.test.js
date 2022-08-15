import React from "react";
import { render } from "@testing-library/react";
import Navigation from "./Navigation";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";

//smoke test
it ("renders without crashing" , function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <Navigation/>
            </UserProvider>
        </MemoryRouter>
    );
});

//snapshot test
it("matches snapshot" , function(){
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Navigation/>
            </UserProvider>
        </MemoryRouter>
    );
    expect (asFragment()).toMatchSnapshot();
});

//snapshot test for logged out
it ("matches snapshot when logged out" , function(){
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <Navigation/>
            </UserProvider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();

});