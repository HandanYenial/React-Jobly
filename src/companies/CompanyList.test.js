import React from "react";
import { render } from "@testing-library/react";
import Companies from "./CompanyList";

it ("renders without crashing" , function(){
    render(<Companies/>);
});

it("matches with snapshot", function(){
    const { asFragment } = render(<Companies/>);
    expect(asFragment()).toMatchSnapshot();
});