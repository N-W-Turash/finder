import React from 'react';
import PropTypes from 'prop-types';
// import MdCall from 'react-ionicons/lib/MdCall';
// import Marker from '../../assets/imgs/marker.svg';
// import Type from '../../assets/imgs/type.svg';
import Default from '../../assets/imgs/default.jpg';
import { ListView } from '../index';

export class Venue extends React.Component {

    render() {

        /**
         * This component gets venueData (object) as prop from the parent container. 
         * 
         */
        
        const  { venueData } = this.props;
        const { name, description, address, categoryName, phone, imgSrc } = venueData;

        /**
         * For now, the name, decription, address, category, contact information and an image 
         * of the selected venue is shown. 
         * 
         */

        return (
            <div className="card custom-card mt-4">
                <div className="card-img-holder">
                    <img src={imgSrc ? imgSrc : Default} className="card-img-top" alt="Venue" /> 
                </div>
                <div className="card-body fs-2">
                    <h5 className="card-title uppercase fw-400 ls-title-">{name}</h5>
                   
                    <p>{description}</p>

                    <ListView 
                        address={address}
                        categoryName={categoryName}
                        phone={phone}
                    />
                </div>
            </div>  
        );
    }
}

Venue.propTypes = {
    venueData: PropTypes.object.isRequired,
};

