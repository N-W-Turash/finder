import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import MdRestaurant from 'react-ionicons/lib/MdRestaurant';
import IosRefresh from 'react-ionicons/lib/IosRefresh';
import { success } from "react-notification-system-redux";
import SearchForm from './components/searchForm';
import SelectedVenue from './components/selectedVenue';
import VenueMap from './components/venueMap';
import { getNearbyVenues, GET_NEARBY_VENUES_REQUESTS, removeSuccessMessage } from "../../modules/actions";

class Home extends React.Component {

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {
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

        const { dispatch, home } = this.props;
        let { selectedVenue, isLoading } = home;

        const onSelectButtonClick = (e) => {
            e.preventDefault();
            dispatch({type: GET_NEARBY_VENUES_REQUESTS});
            dispatch(getNearbyVenues());
        
        };
          
        return (
            <section className="container">
                <div className="main-section" key={1}>
                    <h3 className="mb-3 fw-400 color-white text-center ls-title">
                        <MdRestaurant fontSize="60px" color="#ffffff"  style={{marginRight: '10px', marginTop: '-5px'}}/>
                        RESTAURANT FINDER
                    </h3>
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 col-12">
                                <button 
                                    type="button" 
                                    className="btn btn-danger btn-lg btn-block"
                                    onClick={(e) => onSelectButtonClick(e)}
                                    disabled={isLoading}
                                >
                                    { isLoading ? 'Selecting...' : 'Let us select one for you' }
                                </button>
                        </div>
                    </div>
                    <h3 className="color-white mt-3 text-center fw-400">OR</h3>
                    <SearchForm/>
                </div>

                {
                    isLoading &&
                    <div className="spinner-container">
                        <IosRefresh fontSize="120px" color="#ffffff" rotate={true} />
                    </div>
                }

                {
                    !isLoading && selectedVenue && selectedVenue.details &&
                    
                    <div className="selected-venue-container mb-5 px-4">
                        <div className="row mt-5">
                            <SelectedVenue 
                                selectedVenue={selectedVenue}
                            />
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