import React from "react";
import SearchForm from "./SearchForm";
import { render } from "@testing-library/react";

//Smoke test
it("renders without crashing", function(){
    render(<SearchForm/>);
});

//Snapshot test
it("matches with the snapshot" , function(){
    const { asFragment } = render(<SearchForm/>);
    expect(asFragment()).toMatchSnapshot();

});
