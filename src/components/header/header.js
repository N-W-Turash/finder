import React from "react";
import MdRestaurant from "react-ionicons/lib/MdRestaurant";
import { getClientWidth } from "../../helpers";

export class Header extends React.Component {

    render(){

        return (
            <div className="header-section mb-4">
                <h3 className="mb-2 fw-400 color-white text-center ls-title uppercase fw-400 mt-2">
                    <MdRestaurant fontSize={getClientWidth() > 767 ? "60px" : "30px"} color="#ffffff"  style={{marginRight: '10px', marginTop: '-5px'}}/>
                    FINDER
                </h3>
                <h5 className="color-white text-center mt-0 mb-2 fs-2 fw-400">
                    Find Appropriate Venue For having Team Party Near Ahmed Tower, Banani
                </h5>
            </div>
        );
    }
}


