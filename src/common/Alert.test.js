import React from "react";
import Alert from"./Alert";
import { render } from "@testing-library/react";

//Smoke test
it("renders without crashing" , function(){
    render(<Alert/>);
});

//Snapshot Test for danger message
it ("matches with the snapshot" , function(){
    let messages = ["danger", "Broken app"];
    const { asFragment } = render(<Alert type = "danger" messages={messages}/>);
    expect(asFragment()).toMatchSnapshot();
});

//Snapshot Test for success message
it("matches with the success snapshot", function(){
    let messages = ["success", "Awesome"];
    const { asFragment } = render(<Alert type = "success" messages={messages}/>);
    expect(asFragment()).toMatchSnapshot();
});

