import React from 'react';
import PropTypes from 'prop-types';
import MdSearch from 'react-ionicons/lib/MdSearch';

export default class SearchForm extends React.Component {

    componentDidMount() {}

    render() {

        const { dispatch, formFieldChange, searchText, searchVenues } = this.props;
        // console.log('searchText->', searchText);

        const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(searchVenues(searchText));
        }

        return (
            <div className="form-container">
                <form>
                    <div className="form-row  justify-content-center">
                    <div className="col-lg-4 col-12">
                        <input 
                            type="text" 
                            className="form-control mb-2" 
                            name="searchText"
                            value={searchText}
                            placeholder="Search nearby Restaurants"
                            onChange={(e) => dispatch(formFieldChange(e.target.name, e.target.value))}
                        />
                    </div>
                    <div className="col-auto">
                        <button 
                            type="submit" 
                            className="btn btn-danger mb-2"
                            disabled={!searchText}
                            onClick={(e) => handleSubmit(e)}
                        >
                            Search
                            <MdSearch fontSize="20px" color="#ffffff" style={{marginLeft: '3px', marginTop: '-3px'}}/>
                        </button>
                    </div>
                    </div>
                </form>
            </div>
        );
    }
}

SearchForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    formFieldChange: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
    searchVenues: PropTypes.func.isRequired,
};

