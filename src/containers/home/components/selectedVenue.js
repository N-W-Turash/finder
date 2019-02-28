import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MdCall from 'react-ionicons/lib/MdCall';
import Marker from '../../../assets/imgs/marker.svg';
import Type from '../../../assets/imgs/type.svg';
import Default from '../../../assets/imgs/default.jpg';

export default class SelectedVenue extends React.Component {

    render(){

        const { selectedVenue } = this.props;
        if(selectedVenue && selectedVenue.details) {
            console.log('selectedVenue->', selectedVenue);
        }

        const resolvedImageSource = () => {
            let src = Default;
            const { selectedVenue } = this.props;
            if(selectedVenue && selectedVenue.details && selectedVenue.details.venue.bestPhoto) {
                src = `${selectedVenue.details.venue.bestPhoto.prefix}500x300${selectedVenue.details.venue.bestPhoto.suffix}`
            }
            return src;
        }

        return (
           
            <div className="col-lg-6 col-12">
                <div className="card custom-card mt-4">
                    <div className="card-img-holder">
                        <img src={resolvedImageSource()} className="card-img-top" alt="..." />
                        {/* <img src={Default} className="card-img-top" alt="..." /> */}
                        {/* {
                            selectedVenue && selectedVenue.details && selectedVenue.details.venue.bestPhoto ?
                            <img 
                                src={``} 
                                className="card-img-top" 
                                alt="Venue Photo" 
                            /> :
                            <img 
                                src={Default} 
                                className="card-img-top" 
                                alt="Default Photo" 
                            /> 
                        } */}
                       
                    </div>
                    <div className="card-body">
                        <h5 className="card-title uppercase fw-400 ls-title-">{selectedVenue.name}</h5>
                        {
                            selectedVenue && selectedVenue.details.venue.description ?
                            <p>{selectedVenue.details.venue.description}</p> :
                            undefined
                        }
                        <ul className="list-group custom-list-group list-group-flush mb-3">
                            <li className="list-group-item">
                                <img src={Marker} alt="address" className="svg-icon-left"/>
                                {
                                    selectedVenue.location && selectedVenue.location.address ?                                              
                                    `${selectedVenue.location.address}, ${selectedVenue.location.city}` :                                               
                                    `Dhaka (Details not availbale)`
                                }
                            </li>
                            <li className="list-group-item">
                                <img src={Type} alt="type" className="svg-icon-left"/>
                                {
                                    selectedVenue.categories &&
                                    selectedVenue.categories[0].name ?
                                    selectedVenue.categories[0].name :
                                    `N/A`
                                }
                            </li>
                            <li className="list-group-item">
                                <MdCall fontSize="20px" color="#ffffff"  style={{marginRight: '10px', marginTop: '-5px'}}/>
                                {
                                    selectedVenue && selectedVenue.details && selectedVenue.details.contact &&
                                    selectedVenue.details.contact.phone ? 
                                    selectedVenue.details.contact.phone : 
                                    'N/A'
                                }
                            </li>
                        </ul>
                        <Link to="/unknown" className="btn btn-info">View Details</Link>
                    </div>
                </div>
            </div>
              
        );
    }
}

SelectedVenue.propTypes = {
    selectedVenue: PropTypes.object.isRequired,
};

