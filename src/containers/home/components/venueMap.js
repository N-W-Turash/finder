import React from 'react';
import PropTypes from 'prop-types';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';

/**
 * For showing the map view of a venue we've used pigeon-maps which
 * aims to provide a performance-first React-centric extendable map engine.
 * 
 */

export default class VenueMap extends React.Component {

    render() {

        const { location } = this.props;
        const { lat, lng } = location;

        /**
         * The following props have been used in the Map and Marker components 
         * center: Coordinates of the map center in the format [latitude, langitude]
         * zoom: Current zoom leve
         * height: Height in pixel
         * anchor: coordinates where the map marker is set
         */

        return (
            <Map 
                center={[lat, lng]}        
                zoom={15}                  
                height={550}
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