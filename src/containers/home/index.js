import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import MdRestaurant from 'react-ionicons/lib/MdRestaurant';
// import MdCheckmark from 'react-ionicons/lib/MdCheckmark';
import SearchForm from './components/searchForm';
import { getNearbyVenuesRequests, GET_NEARBY_VENUES_REQUESTS } from "../../modules/actions";

class Home extends React.Component {

    componentDidMount() {}

    render(){

        const onSelectButtonClick = (e) => {
            e.preventDefault();
            dispatch({type: GET_NEARBY_VENUES_REQUESTS});
            dispatch(getNearbyVenuesRequests());
        };

        const { dispatch, home } = this.props;
        let { isLoading, selectedVenue } = home;
        // console.log('venueList->', venueList);
        console.log('selectedVenue->', selectedVenue);

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

                <div className="row mt-5">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-img-holder">
                                <img src="https://via.placeholder.com/350X150" className="card-img-top" alt="..." />
                            </div>
                            <div className="card-body">
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                </div>
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