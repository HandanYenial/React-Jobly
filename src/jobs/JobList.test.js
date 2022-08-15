import React from "react";
import JobList from "./JobList";
import { render } from "@testing-library/react";

//smoke test
it ("renders without crashing" , function(){
    render(<JobList/>);
});

//snapshot test

it ("matches with snapshot", function(){
    const { asFragment } = render(<JobList/>);
    expect(asFragment()).toMatchSnapshot();
});
