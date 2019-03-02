import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Marker from '../../../assets/imgs/marker.svg';
import Type from '../../../assets/imgs/type.svg';

export default class SearchedVenue extends React.Component {

    render() {

        
        /**
         * This component gets searchedVenue(object) as a prop from the parent container. 
         * 
         */

        const { searchedVenue } = this.props;

        /**
         * For now, the name, address and category of a searched venue is shown.
         * We've a plan to sho more information regarding the corresponding venue 
         * in a separate page which has not been implemented yet. 
         * 
         */
  
        return (
           
            <div className="card custom-card mt-4 searched-venue-component">
                    <div className="card-body fs-2">
                        <h5 className="card-title uppercase fw-400 ls-title-">{searchedVenue.name}</h5>
                        <ul className="list-group custom-list-group list-group-flush mb-3">
                            <li className="list-group-item">
                                <img src={Marker} alt="address" className="svg-icon-left"/>
                                {
                                    searchedVenue['location.address'] ?                                              
                                    searchedVenue['location.address'] :                                               
                                    `Dhaka (Details not availbale)`
                                }
                            </li>
                            <li className="list-group-item">
                                <img src={Type} alt="type" className="svg-icon-left"/>
                                {
                                    searchedVenue['categories.0.name'] ?
                                    searchedVenue['categories.0.name'] :
                                    `N/A`
                                }
                            </li>
                        </ul>
                        <Link to="/unknown" className="btn btn-info">View Details</Link>
                    </div>
                </div>
              
        );
    }
}

SearchedVenue.propTypes = {
    searchedVenue: PropTypes.object.isRequired,
};

