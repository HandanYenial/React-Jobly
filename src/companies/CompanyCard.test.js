import React from"react";
import CompanyCard from "./CompanyCard";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";


//snapshot test
it("matches snapshot with logo" , function(){
    const { asFragment } = render(
    <MemoryRouter>
        <CompanyCard
             handle = "test"
             name = "Test Company"
             description = "Testing Company Card"
             logo_url = "https://logos.flamingtext.com/Word-Logos/test-design-sketch-name.png"
        />
    </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot without logo" , function(){
    const { asFragment } = render(
        <MemoryRouter>
            <CompanyCard
                handle = "testwithoutlogo"
                name = "Test Company without logo"
                description = "Testing Company Card without logo"
            />

        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});