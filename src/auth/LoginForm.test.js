import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router-dom";

//Memory Router: Memory router keeps the URL changes in memory not in 
//the user browsers. It keeps the history of the URL in memory (does not 
//read or write to the address bar so the user can not use the browser's
// back button as well as the forward button. It is used for testing
//purposes.

it ("renders without crashing", function(){
    render(<LoginForm/>);
});

//Snapshot Test
it("matches snapshot" , function(){
    const { asFragment } = render(
        <MemoryRouter>
            <LoginForm/>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});