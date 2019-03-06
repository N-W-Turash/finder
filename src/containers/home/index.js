import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import MdRestaurant from 'react-ionicons/lib/MdRestaurant';
import IosRefresh from 'react-ionicons/lib/IosRefresh';
import { success } from "react-notification-system-redux";
import { VenueMap } from '../../components/';
import SearchForm from './components/searchForm';
import SelectedVenue from './components/selectedVenue';
import SearchedVenue from './components/searchedVenue';
import { 
    getNearbyVenues, 
    GET_NEARBY_VENUES_REQUESTS, 
    removeSuccessMessage ,
    formFieldChange,
    selectRandomVenue,
    GET_VENUE_DETAILS_REQUEST,
    getVenueDetails,
    searchVenues,
    viewDetailsModalOpen,
    viewDetailsModalClose,
} from "../../modules/actions";

class Home extends React.Component {

    /**
     * 'componentDidMount()' is invoked immediately after a component is mounted (inserted into the tree). 
     * Initialization that requires DOM nodes should go here. If we need to load data from a remote 
     * endpoint, this is a good place to instantiate the network request.
     * 
     * A request to foursquare places API is made as soon as the component mounts.
     * Upon successful completion of the request; a list of nearby venues gets loaded.
     * 
     */

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({type: GET_NEARBY_VENUES_REQUESTS});
        dispatch(getNearbyVenues());
    }

    /**
     * **IMPORTANT** Note: This needs to be updated later.
     * This lifecycle was previously named componentWillReceiveProps. 
     * That name will continue to work until version 17. 
     * UNSAFE_componentWillReceiveProps() is invoked before a mounted component receives new props.
     * 
     * Here, we've used this to show tray notification upon the succesful selection of a venue 
     * as the component recieves new props from the state (successMessage).
     * 
     */

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { dispatch } = nextProps;
        const { successMessage } = nextProps.home;
        const successNotificationOpts = {
            title: 'Success!',
            message: successMessage,
            position: 'tr',
            autoDismiss: 1
        };

        if(successMessage) {
            dispatch(success(successNotificationOpts));
            dispatch(removeSuccessMessage());
        }
    }

    render() {

        /**
         * gets dispatch function and 'home' state as props.
         * 
         */

        const { dispatch, home } = this.props;
        let { selectedVenue, isLoading, searchText, venuesList, isSelecting, 
            searchedVenuesList, searchFlag, showViewDetailsModal, getNearByVenuesApiError, venueDetailsApiError } = home;
        
        /**
         * Gets a random integer between 0 (inclusive) and length of the retrieved array of venues (exclusive).
         * Dispatches necessary actions to select a venue from the retrieved list and then loads detailed data of it.  
         * 
         */
        
        const onSelectButtonClick = (e) => {
            e.preventDefault();
            let randomIndex = Math.floor(Math.random()*venuesList.length);
            dispatch(selectRandomVenue(randomIndex));
            dispatch({type: GET_VENUE_DETAILS_REQUEST});
            dispatch(getVenueDetails(venuesList[randomIndex].id, 'selectedVenue'));
        };

        const closeViewDetailsModal = () => {
            const {dispatch} = this.props;
            dispatch(viewDetailsModalClose());
        };
    
        const openViewDetailsModal = () => {
            const {dispatch} = this.props;
            dispatch(viewDetailsModalOpen());
        };
          
        return (
            <section className="container">
                <div className="main-section" key={1}>
                    <h3 className="mb-2 fw-400 color-white text-center ls-title">
                        <MdRestaurant fontSize="60px" color="#ffffff"  style={{marginRight: '10px', marginTop: '-5px'}}/>
                        FINDER
                    </h3>
                    <h4 className="color-white text-center mt-0 mb-4">
                        Find Appropriate Venue For having Team Party Near Ahmed Tower, Banani
                    </h4>
                    {
                        getNearByVenuesApiError && getNearByVenuesApiError.meta && getNearByVenuesApiError.meta.code ?

                        <div className="alert alert-danger mt-4" role="alert">
                            Cannot retrieve the data of nearby venues due to the occurrence of an unexpected error. So, the service is currently unavailable.
                        </div>:

                        <div>
                            <div className="row justify-content-center">
                                <div className="col-lg-6 col-md-6 col-12">
                                        <button 
                                            type="button" 
                                            className="btn btn-danger btn-lg btn-block"
                                            onClick={(e) => onSelectButtonClick(e)}
                                            disabled={isLoading || isSelecting}
                                        >
                                            { isSelecting ? 'Selecting...' : 'Let us select one for you' }
                                        </button>
                                </div>
                            </div>
                            <h3 className="color-white mt-3 text-center fw-400">OR</h3>
                            <SearchForm
                                dispatch={dispatch}
                                formFieldChange={formFieldChange}
                                searchText={searchText}
                                searchVenues={searchVenues}
                            />
                        </div>
                    }
                </div>

                {
                    venueDetailsApiError && venueDetailsApiError.meta && venueDetailsApiError.meta.code &&
                    <div className="alert alert-danger mt-4" role="alert">
                        An unexpected error occurred while retrieving the data; please try again later.
                    </div>
                }

                {
                    isSelecting &&
                    <div className="spinner-container">
                        <IosRefresh fontSize="120px" color="#ffffff" rotate={true} />
                    </div>
                }

                {
                    !isSelecting && selectedVenue && selectedVenue.details &&
                    
                    <div className="venue-container mb-5 px-4">
                        <div className="row mt-5">
                            <div className="col-lg-6 col-12">
                                <SelectedVenue 
                                    selectedVenue={selectedVenue}
                                    openViewDetailsModal={openViewDetailsModal}
                                    closeViewDetailsModal={closeViewDetailsModal}
                                    showViewDetailsModal={showViewDetailsModal}
                                />
                            </div>
                            <div className="col-lg-6 col-12">
                                {
                                    selectedVenue && selectedVenue.location &&
                                    <div className="selected-venue-map-container mt-4">
                                        {
                                            <VenueMap
                                                location={selectedVenue.location}
                                            />
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }

                {
                    !selectedVenue.id && searchedVenuesList.length  && 
                    <div className="seareched-venues-container mb-5 px-4">
                        <div className="row row-flex">
                            {
                                searchedVenuesList.map((searchedVenue, index) => {
                                    return (
                                        <div className="col-lg-4 mt-4" key={index}>
                                            <SearchedVenue 
                                                searchedVenue={searchedVenue}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div> 
                }

                {
                    !selectedVenue.id && !searchedVenuesList.length && searchFlag &&
                    <div className="well mt-5 py-3">
                        <h1 className="color-white text-center mb-0">
                            Nothing Found
                        </h1>
                    </div>
                }
            </section>
        );
    }
}

Home.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    home: state.home
});

export default Home = withRouter(connect(mapStateToProps)(Home));