import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Animated } from 'react-animated-css';
import Slider from 'react-slick';
import { /*VenueMap*/ Header, Loading, ErrorDisplay } from '../../components/';
import SearchForm from './components/searchForm';
// import SelectedVenue from './components/selectedVenue';
import SearchedVenue from './components/searchedVenue';

import {
	getNearbyVenues,
	GET_NEARBY_VENUES_REQUESTS,
	formFieldChange,
	searchVenues,
	// viewDetailsModalOpen,
	// viewDetailsModalClose,
	areaSelectFieldChange,
	inputRangetFieldChange
} from '../../modules/actions';

class Home extends React.Component {
	render() {
		/**
		 * gets dispatch function and 'home' state as props.
		 *
		 */

		const { dispatch, home } = this.props;
		let {
			isLoading,
			searchFormObject,
			searchedVenuesList,
			getNearByVenuesApiError,
			filterObject,
			filteredVenueList
		} = home;

		const searchedVenuesListLength = searchedVenuesList.length,
			filteredVenuesListLength = filteredVenueList.length;

		const venueList = filteredVenuesListLength
			? filteredVenueList
			: searchedVenuesList;

		/**
		 * Function where the action creator related with opening the modal displaying details information of a venue.
		 *
		 */

		// const closeViewDetailsModal = () => {
		// 	const { dispatch } = this.props;
		// 	dispatch(viewDetailsModalClose());
		// };

		/**
		 * Function where the action creator related with opening the modal displaying details information of a venue.
		 *
		 */

		// const openViewDetailsModal = () => {
		// 	const { dispatch } = this.props;
		// 	dispatch(viewDetailsModalOpen());
		// };

		const handleFilterInput = e => {
			dispatch(
				formFieldChange(e.target.name, e.target.value, 'filterObject')
			);
			dispatch(searchVenues());
		};

		const settings = {
			dots: true,
			infinite: false,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 3,
			initialSlide: 0,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						dots: true
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						initialSlide: 2
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		};

		return (
			<section className="container">
				<Header />

				<Animated
					animationIn="fadeIn"
					animationOut="fadeIn"
					isVisible={true}
				>
					<div className="main-section mb-5">
						<div>
							<div className="row mt-3 justify-content-center">
								<div className="col-lg-6 col-md-6 col-12">
									<SearchForm
										dispatch={dispatch}
										formFieldChange={formFieldChange}
										searchFormObject={searchFormObject}
										searchVenues={searchVenues}
										areaSelectFieldChange={
											areaSelectFieldChange
										}
										inputRangetFieldChange={
											inputRangetFieldChange
										}
										getNearbyVenues={getNearbyVenues}
										GET_NEARBY_VENUES_REQUESTS={
											GET_NEARBY_VENUES_REQUESTS
										}
									/>
								</div>
							</div>
						</div>
					</div>
				</Animated>

				{getNearByVenuesApiError &&
				getNearByVenuesApiError.meta &&
				getNearByVenuesApiError.meta.code ? (
					<ErrorDisplay errorMessage="Cannot retrieve the data of nearby venues due to the occurrence of an unexpected error. So, the service is currently unavailable." />
				) : (
					undefined
				)}

				{isLoading && <Loading />}

				{!isLoading &&
				(searchedVenuesListLength || filteredVenuesListLength) ? (
					<Animated
						animationIn="fadeIn"
						animationOut="fadeIn"
						isVisible={true}
					>
						<div className="seareched-venues-container mb-5 px-4">
							<div className="row">
								<div className="col-lg-4 col-md-8 col-xs-12">
									<input
										type="text"
										className="form-control form-control-custom mb-3"
										name="filterText"
										id="#filterText"
										value={filterObject.filterText}
										placeholder="Filter by name / location / category"
										onChange={e => handleFilterInput(e)}
									/>
								</div>
							</div>

							<Slider {...settings}>
								{venueList.map((venue, index) => {
									let address = filteredVenuesListLength
											? venue['location.address']
											: venue.location.address,
										category = filteredVenuesListLength
											? venue['categories.0.name']
											: venue.categories[0].name,
										distance = filteredVenuesListLength
											? venue['location.distance']
											: venue.location.distance;
									return (
										<SearchedVenue
											key={index}
											id={venue.id}
											name={venue.name}
											address={
												address
													? address
													: `Dhaka (Details not availbale)`
											}
											category={
												category ? category : `N/A`
											}
											distance={
												distance
													? `${(
															distance / 1000
													  ).toFixed(2)} KM`
													: `N/A`
											}
										/>
									);
								})}
							</Slider>
						</div>
					</Animated>
				) : (
					undefined
				)}
			</section>
		);
	}
}

Home.propTypes = {
	dispatch: PropTypes.func.isRequired,
	home: PropTypes.object.isRequired
};

/**
 * The connect() function connects a React component to a Redux store.
 * If a mapStateToProps function is specified, the new wrapper component will subscribe to Redux store updates.
 * This means that any time the store is updated, mapStateToProps will be called.
 * The mapStateToProps functions are expected to return an object. This object, normally referred to as
 * stateProps, will be merged as props to the connected component.
 *
 * We can get access to the history object’s properties and the closest <Route>'s match via the withRouter
 * higher-order component. withRouter will pass updated match, location, and history props to the
 * wrapped component whenever it renders.
 *
 */

const mapStateToProps = state => ({
	home: state.home
});

export default (Home = withRouter(connect(mapStateToProps)(Home)));
