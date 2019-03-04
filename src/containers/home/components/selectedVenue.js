import React from 'react';
import PropTypes from 'prop-types';
import ViewSelectedVenueDetailsModal from './viewSelectedVenueDetailsModal';
import { Venue } from '../../../components/';


export default class SelectedVenue extends React.Component {

    render() {

        /**
         * This component gets selectedVenue(boolean), openViewDetailsModal(function), closeViewDetailsModal(function) 
         * and showViewDetailsModal(boolean) as props from the parent container. 
         * 
         */

        const { selectedVenue, openViewDetailsModal, closeViewDetailsModal, showViewDetailsModal } = this.props;
        let venueData = {};

        if(selectedVenue.details && selectedVenue.details.venue) {
            let { details: { venue } } = selectedVenue;
            venueData = {
                name: selectedVenue.name ? selectedVenue.name : "N/A",
                description: venue.description ? venue.description : "Description Not Available",
                address: venue.location && venue.location.address ? venue.location.address : "Dhaka (Details not availbale)",
                categoryName: venue.categories && venue.categories[0].name ? venue.categories[0].name: "N/A",
                phone: venue.contact && venue.contact.phone ? venue.contact.phone : "N/A",
                imgSrc: venue.bestPhoto ?  `${venue.bestPhoto.prefix}500x300${venue.bestPhoto.suffix}` : false,
            }
        }

        /**
         * For now, the name, decription, address, category and contact information 
         * and an image of the selected venue is shown. 
         * 
         */

        return [
           
            <Venue
                key={1}
                venueData={venueData}
            />,
            <button onClick={(e) => {openViewDetailsModal()}} className="btn btn-info mb-4" key={2}>View Details</button>,
             <ViewSelectedVenueDetailsModal
                key={3}
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

