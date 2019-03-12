import React from "react";
import { shallow } from "enzyme";
import { RouterComponent } from "../router/router";
import { routesList as components } from "../../helpers/";

describe("RouterComponent", () => {
    it("RouterComponent should render properly.",() => {
        shallow(<RouterComponent routes={components} />);
    });
});