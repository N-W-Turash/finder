import React from 'react';
import PropTypes from 'prop-types';
import MdCall from 'react-ionicons/lib/MdCall';
import Marker from '../../../assets/imgs/marker.svg';
import Type from '../../../assets/imgs/type.svg';
import Default from '../../../assets/imgs/default.jpg';
import ViewSelectedVenueDetailsModal from './viewSelectedVenueDetailsModal';

export default class SelectedVenue extends React.Component {

    render() {

        const { selectedVenue, openViewDetailsModal, closeViewDetailsModal, showViewDetailsModal } = this.props;
        // if(selectedVenue && selectedVenue.details) {
        //     console.log('selectedVenue->', selectedVenue);
        // }

        const resolvedImageSource = () => {
            let src = Default;
            const { selectedVenue } = this.props;
            if(selectedVenue && selectedVenue.details && selectedVenue.details.venue.bestPhoto) {
                src = `${selectedVenue.details.venue.bestPhoto.prefix}500x300${selectedVenue.details.venue.bestPhoto.suffix}`
            }
            return src;
        }

        return [
           
            <div className="col-lg-6 col-12" key={1}>
                <div className="card custom-card mt-4">
                    <div className="card-img-holder">
                        <img src={resolvedImageSource()} className="card-img-top" alt="Venue" /> 
                    </div>
                    <div className="card-body fs-2">
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
                        <button onClick={(e) => {openViewDetailsModal()}} className="btn btn-info">View Details</button>
                    </div>
                </div>
            </div>,
             <ViewSelectedVenueDetailsModal
                key={2}
                open={showViewDetailsModal}
                onClose={closeViewDetailsModal}
                selectedVenue={selectedVenue}
            />
              
        ];
    }
}

SelectedVenue.propTypes = {
    selectedVenue: PropTypes.object.isRequired,
    openViewDetailsModal: PropTypes.func.isRequired,
    closeViewDetailsModal: PropTypes.func.isRequired,
    showViewDetailsModal: PropTypes.bool.isRequired
};

