import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import PropTypes from "prop-types";

export default class ViewSelectedVenueDetailsModal extends Component {

    render() {

        const { open, onClose, selectedVenue } = this.props;
        const { details: { venue } } = selectedVenue;

        return (
            <Modal 
                open = {open} 
                onClose = {onClose} 
                center 
                showCloseIcon={false}
                styles={{
                    modal: {
                        background: 'rgba(0, 0, 0, .5)',
                        color: 'white'
                    }
                }}

            >
                <h3 className="mt-0">Selected Venue Details</h3>
                <div className="view-details-section">
                    <p className="mb-1">Name:</p>
                    <p>
                        <strong>{venue && venue.name ? venue.name: 'N/A'}</strong>
                    </p>
                    <p className="mb-1">Address:</p>
                    <p>
                        <strong>{venue && venue.location.address ? venue.location.address: 'N/A'}</strong>
                    </p>
                    <p className="mb-1">Venue Type:</p>
                    <p>
                        <strong>{venue && venue.categories[0].name ? venue.categories[0].name: 'N/A'}</strong>
                    </p>
                    <p className="mb-1">Distance:</p>
                    <p>
                        <strong>{selectedVenue && selectedVenue.location.distance ? `${selectedVenue.location.distance} m`: 'N/A'}</strong>
                    </p>
                </div>
                <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {onClose()}}
                >
                    Close
                </button>
            </Modal>
        );
    }
}

ViewSelectedVenueDetailsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedVenue: PropTypes.object.isRequired
};