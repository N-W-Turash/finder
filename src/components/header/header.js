import React from 'react';
import MdRestaurant from 'react-ionicons/lib/MdRestaurant';

export class Header extends React.Component {

    render(){

        return (
            <div className="header-section mb-4">
                <h3 className="mb-2 fw-400 color-white text-center ls-title">
                    <MdRestaurant fontSize="60px" color="#ffffff"  style={{marginRight: '10px', marginTop: '-5px'}}/>
                    FINDER
                </h3>
                <h4 className="color-white text-center mt-0 mb-4">
                    Find Appropriate Venue For having Team Party Near Ahmed Tower, Banani
                </h4>
            </div>
        );
    }
}


