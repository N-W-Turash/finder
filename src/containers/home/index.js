import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import SearchForm from './components/searchForm';
import { selectRandomRestaurant } from "../../modules/actions";

class Home extends React.Component {

    componentDidMount() {}

    render(){

        const onSelectButtonClick = (e) => {
            e.preventDefault();
            dispatch(selectRandomRestaurant());
        };
    

        const { dispatch, home } = this.props;
        let { selectedRestaurant } = home;
        console.log('selectedRestaurant->', selectedRestaurant);

        return (
            <section className="container main-section">
                <h3 className="mb-3 fw-600 color-white text-center">
                   Restaurant Finder
                </h3>
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-6 col-12">
                            <button 
                                type="button" 
                                className="btn btn-primary btn-lg btn-block"
                                onClick={(e) => onSelectButtonClick(e)}
                            >
                                Let us find one for you
                            </button>
                    </div>
               </div>
               <h4 className="color-white mt-1 text-center">Or</h4>
               <SearchForm/>
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