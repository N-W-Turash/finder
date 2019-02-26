import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import MdRestaurant from 'react-ionicons/lib/MdRestaurant';
import MdCheckmark from 'react-ionicons/lib/MdCheckmark';
import SearchForm from './components/searchForm';
import { getNearbyRestaurantsRequests } from "../../modules/actions";

class Home extends React.Component {

    componentDidMount() {}

    render(){

        const onSelectButtonClick = (e) => {
            e.preventDefault();
            dispatch(getNearbyRestaurantsRequests());
        };

        const { dispatch, home } = this.props;
        let { restaurantList, selectedRestaurant } = home;
        // console.log('restaurantList->', restaurantList);
        console.log('selectedRestaurant->', selectedRestaurant);

        return (
            <section className="container main-section">
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
                            >
                                Let us select one for you
                                <MdCheckmark fontSize="20px" color="#ffffff" style={{marginLeft: '3px', marginTop: '-3px'}}/>
                            </button>
                    </div>
               </div>
               <h3 className="color-white mt-3 text-center fw-400">OR</h3>
               <SearchForm/>
               {/*<div className="card">
                    {
                       restaurantList.length && restaurantList.map((restaurant, index) => {
                           return <p key={index}>{restaurant.location.distance}</p>
                       }) 
                    }
                </div>*/}
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