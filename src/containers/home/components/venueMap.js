import React from 'react';
import PropTypes from 'prop-types';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';

export default class VenueMap extends React.Component {

    render(){

        const { location } = this.props;
        const { lat, lng } = location;

        return (
            <Map 
                center={[lat, lng]} 
                zoom={15} 
                height={550} // height in pixel
            >
                <Marker 
                    anchor={[lat, lng]}
                />
            </Map>
        );
    }
}

VenueMap.propTypes = {
    location: PropTypes.object.isRequired,
};