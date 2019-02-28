import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux";
import MdRestaurant from 'react-ionicons/lib/MdRestaurant';
import MdCall from 'react-ionicons/lib/MdCall';
import SearchForm from './components/searchForm';
import Marker from '../../assets/imgs/marker.svg';
import Type from '../../assets/imgs/type.svg';
import Default from '../../assets/imgs/food.jpg';
import { getNearbyVenues, GET_NEARBY_VENUES_REQUESTS } from "../../modules/actions";

class Home extends React.Component {

    componentDidMount() {}

    render(){

        const onSelectButtonClick = (e) => {
            e.preventDefault();
            dispatch({type: GET_NEARBY_VENUES_REQUESTS});
            dispatch(getNearbyVenues());
        };

        const { dispatch, home } = this.props;
        let { selectedVenue, isLoading } = home;
        if(selectedVenue && selectedVenue.details) {
            console.log('selectedVenue->', selectedVenue);
        }

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
                                {/*<MdCheckmark fontSize="20px" color="#ffffff" style={{marginLeft: '3px', marginTop: '-3px'}}/>*/}
                                </button>
                        </div>
                    </div>
                    <h3 className="color-white mt-3 text-center fw-400">OR</h3>
                    <SearchForm/>
                </div>

                {
                    selectedVenue && selectedVenue.details ?
                    <div className="row mt-5">
                        <div className="col-lg-8">
                            <div className="card custom-card">
                                <div className="card-img-holder">
                                    <img src={Default} className="card-img-top" alt="..." />
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
                                    <Link to="https://google.com" className="btn btn-info">View Details</Link>
                                </div>
                            </div>
                        </div>
                    </div> :
                    undefined
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