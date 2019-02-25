import React from 'react';
// import PropTypes from 'prop-types';

export default class SearchForm extends React.Component {

    componentDidMount() {}

    render(){

        return (
            <div className="form-container">
                <form>
                    <div className="form-row  justify-content-center">
                    <div className="col-lg-4 col-12">
                        <input 
                            type="text" 
                            className="form-control mb-2" 
                            id="search-restaurant" 
                            placeholder="Search nearby Restaurants" 
                        />
                    </div>
                    <div className="col-auto">
                        <button 
                            type="submit" 
                            className="btn btn-primary mb-2"
                        >
                            Search
                        </button>
                    </div>
                    </div>
                </form>
            </div>
        );
    }
}

SearchForm.propTypes = {
    // dispatch: PropTypes.func.isRequired,
};

