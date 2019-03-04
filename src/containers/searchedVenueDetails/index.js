import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import IosRefresh from 'react-ionicons/lib/IosRefresh';
import { 
    GET_VENUE_DETAILS_REQUEST,
    getVenueDetails,
} from '../../modules/actions';
import { Venue, VenueMap } from '../../components/';

class SearchedVenueDetails extends React.Component {

    componentDidMount() {
        const { dispatch, match: { params: { id } } } = this.props;
        dispatch({type: GET_VENUE_DETAILS_REQUEST});
        dispatch(getVenueDetails(id, 'searchedVenueDetails'));
    }

    render() {

        const { home } = this.props;
        const { searchedVenueDetails, isVenuDetailsDataLoading } = home;
        let venueData = {};

        if(searchedVenueDetails.venue) {
            let { venue } = searchedVenueDetails;
            venueData = {
                name: venue.name ? venue.name : "N/A",
                description: venue.description ? venue.description : "Description Not Available",
                address: venue.location && venue.location.address ? venue.location.address : "Dhaka (Details not availbale)",
                categoryName: venue.categories && venue.categories[0].name ? venue.categories[0].name: "N/A",
                phone: venue.contact && venue.contact.phone ? venue.contact.phone : "N/A",
                imgSrc: venue.bestPhoto ?  `${venue.bestPhoto.prefix}500x300${venue.bestPhoto.suffix}` : false,
            }
        }

        return (
           <section className="container">
                {
                    isVenuDetailsDataLoading ?

                    <div className="spinner-container">
                        <IosRefresh fontSize="120px" color="#ffffff" rotate={true} />
                    </div> :

                    <div className="venue-container mb-5 px-4">
                        <div className="row mt-5">
                            <div className="col-lg-6 col-12">
                                <Venue
                                    venueData={venueData}
                                 />
                            </div>
                            <div className="col-lg-6 col-12">
                                {
                                    searchedVenueDetails.venue && searchedVenueDetails.venue.location &&
                                    <div className="selected-venue-map-container mt-4">
                                        {
                                            <VenueMap
                                                location={searchedVenueDetails.venue.location}
                                            />
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
                <Link to="/" className="btn btn-info">Go Back To Home</Link>
           </section>
        );
    }
}

SearchedVenueDetails.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    home: state.home
});

export default SearchedVenueDetails = withRouter(connect(mapStateToProps)(SearchedVenueDetails));

