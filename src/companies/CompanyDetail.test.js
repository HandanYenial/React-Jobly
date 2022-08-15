import React from"react";
import Company from "./CompanyDetail";
import { render } from "@testing-library/react";
import { MemoryRouter , Route} from "react-router-dom";
import { UserProvider } from "../testUtils";

//UserProvider: it will provide the context for the user
//MemoryRouter: it will provide the context for the router
//CompanyDetail: it will render the component


//smoke test
it("renders without crashing" , function(){
    render(
    <MemoryRouter>
        <UserProvider>
        <Company/>
        </UserProvider>
    </MemoryRouter>
    );
});

//snapshot test
it("matches snapshot", function(){
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Route path="/company/:handle">
                    <Company/>
                </Route>
            </UserProvider>
        </MemoryRouter>
    );
    expect (asFragment()).toMatchSnapshot();
});