import React from "react";
import { shallow } from "enzyme";
import { Header } from "../header/header";

describe("Header", () => {
    it("Header component should render properly.", () => {
        shallow(<Header/>);
    });
});