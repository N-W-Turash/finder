import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { Header } from "../header/header";

Enzyme.configure({ adapter: new Adapter() });

describe("Header", () => {
    it("Header should render properly.",() => {
        shallow(<Header/>);
    });
});