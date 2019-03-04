import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import IosRefresh from 'react-ionicons/lib/IosRefresh';
import MdCall from 'react-ionicons/lib/MdCall';
import Marker from '../../assets/imgs/marker.svg';
import Type from '../../assets/imgs/type.svg';
import Default from '../../assets/imgs/default.jpg';
import { 
    GET_VENUE_DETAILS_REQUEST,
    getVenueDetails,
} from '../../modules/actions';
import { VenueMap } from '../../components/';

class SearchedVenueDetails extends React.Component {

    componentDidMount() {
        const { dispatch, match: { params: { id } } } = this.props;
        dispatch({type: GET_VENUE_DETAILS_REQUEST});
        dispatch(getVenueDetails(id, 'searchedVenueDetails'));
    }

    render() {

        const { home } = this.props;
        const { searchedVenueDetails, isVenuDetailsDataLoading } = home;
        console.log('searchedVenueDetails->', searchedVenueDetails);
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
                                <div className="card custom-card mt-4" key={1}>
                                    <div className="card-img-holder">
                                        <img src={Default} className="card-img-top" alt="Venue" /> 
                                    </div>
                                    <div className="card-body fs-2">
                                        <h5 className="card-title uppercase fw-400 ls-title-">
                                            { 
                                                searchedVenueDetails.venue && searchedVenueDetails.venue.name && 
                                                searchedVenueDetails.venue.name
                                            }
                                        </h5>
                                        {
                                            searchedVenueDetails && searchedVenueDetails.venue && searchedVenueDetails.venue.description &&
                                            <p>{searchedVenueDetails.venue.description}</p> 
                                        }
                                        <ul className="list-group custom-list-group list-group-flush mb-3">
                                            <li className="list-group-item">
                                                <img src={Marker} alt="address" className="svg-icon-left"/>
                                                {
                                                    searchedVenueDetails && searchedVenueDetails.venue && searchedVenueDetails.venue.location && searchedVenueDetails.venue.location && searchedVenueDetails.venue.location.address ?                                              
                                                    `${searchedVenueDetails.venue.location.address}, ${searchedVenueDetails.venue.location.city}` :                                               
                                                    `Dhaka (Details not availbale)`
                                                }
                                            </li>
                                            <li className="list-group-item">
                                                <img src={Type} alt="type" className="svg-icon-left"/>
                                                {
                                                    searchedVenueDetails.venue &&
                                                    searchedVenueDetails.venue.categories &&
                                                    searchedVenueDetails.venue.categories[0].name ?
                                                    searchedVenueDetails.venue.categories[0].name :
                                                    `N/A`
                                                }
                                            </li>
                                            <li className="list-group-item">
                                                <MdCall fontSize="20px" color="#ffffff"  style={{marginRight: '10px', marginTop: '-5px'}}/>
                                                {
                                                    searchedVenueDetails.venue &&  searchedVenueDetails.venue.contact &&
                                                    searchedVenueDetails.venue.contact.phone ? 
                                                    searchedVenueDetails.venue.contact.phone : 
                                                    'N/A'
                                                }
                                            </li>
                                        </ul>
                                        {/* <button onClick={(e) => {openViewDetailsModal()}} className="btn btn-info">View Details</button> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                {
                                    searchedVenueDetails && searchedVenueDetails.venue && searchedVenueDetails.venue.location &&
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

