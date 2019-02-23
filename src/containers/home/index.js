import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux";

class Home extends React.Component {

    componentDidMount() {}

    render(){

        return [
            <section className="container gtr-registration-section" key={1}>
                <h3 className="mb-3 fw-600">
                   Home
                </h3>
            </section>
        ];
    }
}

Home.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

});

export default Home = withRouter(connect(mapStateToProps)(Home));