import React from "react";
import { render } from "@testing-library/react";
import ProfileForm from "./ProfileForm";
import { UserProvider } from "../testUtils";

//smoke test
it ("renders without crashing" , function(){
    render(
        <UserProvider>
            <ProfileForm/>
        </UserProvider>
    );
});

//snapshot test
it ("matches snapshot" , function(){
    let item = {
        firstName: "John",
        lastName : "Doe",
        email : "john@test.com",
        photoUrl : "http://test.com",
        username : "john",
        password : "password"
    };
    const { asFragment } = render(
        <UserProvider>
            <ProfileForm item={item}/>
        </UserProvider>
    );
    expect (asFragment()).toMatchSnapshot();
});