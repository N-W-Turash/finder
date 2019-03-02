import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import PropTypes from "prop-types";

export default class ViewSelectedVenueDetailsModal extends Component {

    render() {

        /**
         * This component gets open(boolean), onClose(function) and selectedVenue(object) 
         * props from the parent component.
         * 
         */

        const { open, onClose, selectedVenue } = this.props;
        const { details: { venue } } = selectedVenue;

        /**
         * We've used the Modal component from the 'react-responsive-modal' lib to
         * show some additional information regarding a selected venue.
         * 
         * The following props have been passed to the Modal component:
         * > open: (boolean) Control if the modal is open or not.
         * > onClose: (function) Callback fired when the Modal is requested to be closed by a 
         *   click on the overlay or when user press esc key.
         * > center: (boolean) Should the modal be centered.
         * > showCloseIcon: (boolean) To or not to show the close icon.
         * > styles: (object) An object containing the styles objects to style the modal, 
         *   can have properties 'overlay', 'modal', 'closeButton', 'closeIcon'.
         * 
         * For now, only the name, address, category and distance of the venue are shown in the modal.
         * 
         */

        return (
            <Modal 
                open = {open} 
                onClose = {onClose} 
                center 
                showCloseIcon={false}
                styles={{
                    modal: {
                        background: 'rgba(0, 0, 0, .5)',
                        color: 'white',
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
                        <strong>
                            {
                                venue && venue.categories[0].name ? 
                                venue.categories[0].name: 
                                'N/A'
                                }
                            </strong>
                    </p>
                    <p className="mb-1">Distance:</p>
                    <p>
                        <strong>
                            {
                                selectedVenue && selectedVenue.location.distance ? 
                                `${(selectedVenue.location.distance/1000).toFixed(2)} km`: 
                                'N/A'
                            }
                        </strong>
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