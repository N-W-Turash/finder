import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { RouterComponent } from "./router";
import { routesList as components } from "../helpers/";

Enzyme.configure({ adapter: new Adapter() });

describe("RouterComponent", () => {
    it("RouterComponent should render properly.",() => {
        shallow(<RouterComponent routes={components} />);
    });
});