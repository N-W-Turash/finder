import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Notifications, { success } from 'react-notification-system-redux';
import { Animated } from 'react-animated-css';
import { VenueMap, Header, Loading } from '../../components/';
import SearchForm from './components/searchForm';
import SelectedVenue from './components/selectedVenue';
import SearchedVenue from './components/searchedVenue';
// import { getClientWidth } from '../../helpers';
import {
	getNearbyVenues,
	GET_NEARBY_VENUES_REQUESTS,
	removeSuccessMessage,
	formFieldChange,
	// selectRandomVenue,
	// GET_VENUE_DETAILS_REQUEST,
	// getVenueDetails,
	searchVenues,
	viewDetailsModalOpen,
	viewDetailsModalClose,
	areaSelectFieldChange,
	inputRangetFieldChange
} from '../../modules/actions';

class Home extends React.Component {
	/**
	 * 'componentDidMount()' is invoked immediately after a component is mounted (inserted into the tree).
	 * Initialization that requires DOM nodes should go here. If we need to load data from a remote
	 * endpoint, this is a good place to instantiate the network request.
	 *
	 * A request to foursquare places API is made as soon as the component mounts.
	 * Upon successful completion of the request; a list of nearby venues gets loaded.
	 *
	 */

	componentDidMount() {
		// const { dispatch } = this.props;
		// dispatch({ type: GET_NEARBY_VENUES_REQUESTS });
		// dispatch(getNearbyVenues());
	}

	/**
	 * **IMPORTANT** Note: This needs to be updated later.
	 * This lifecycle was previously named componentWillReceiveProps.
	 * That name will continue to work until version 17.
	 * The function UNSAFE_componentWillReceiveProps is invoked before a mounted component receives new props.
	 *
	 * Here, we've used this to show tray notification upon the succesful selection of a venue
	 * as the component recieves new prop (successMessage) from the state.
	 *
	 */

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { dispatch } = nextProps;
		const { successMessage } = nextProps.home;
		const successNotificationOpts = {
			title: 'Success!',
			message: successMessage,
			position: 'tr',
			autoDismiss: 1
		};

		if (successMessage) {
			dispatch(success(successNotificationOpts));
			dispatch(removeSuccessMessage());
		}
	}

	render() {
		/**
		 * gets dispatch function and 'home' state as props.
		 *
		 */

		const { dispatch, home, notifications } = this.props;
		let {
			selectedVenue,
			isLoading,
			searchFormObject,
			// venuesList,
			isSelecting,
			searchedVenuesList,
			// searchFlag,
			showViewDetailsModal,
			getNearByVenuesApiError,
			venueDetailsApiError,
			filterObject,
			filteredVenueList
		} = home;

		const searchedVenuesListLength = searchedVenuesList.length,
			filteredVenuesListLength = filteredVenueList.length;

		const venueList = filteredVenuesListLength
			? filteredVenueList
			: searchedVenuesList;

		/**
		 * Gets a random integer between 0 (inclusive) and length of the retrieved array of venues (exclusive).
		 * Dispatches necessary actions to select a venue from the retrieved list and then loads detailed data of it.
		 *
		 */

		// const onSelectButtonClick = e => {
		// 	e.preventDefault();
		// 	let randomIndex = Math.floor(Math.random() * venuesList.length);
		// 	dispatch(selectRandomVenue(randomIndex));
		// 	dispatch({ type: GET_VENUE_DETAILS_REQUEST });
		// 	dispatch(
		// 		getVenueDetails(venuesList[randomIndex].id, 'selectedVenue')
		// 	);
		// };

		/**
		 * Function where the action creator related with opening the modal displaying details information of a venue.
		 *
		 */

		const closeViewDetailsModal = () => {
			const { dispatch } = this.props;
			dispatch(viewDetailsModalClose());
		};

		/**
		 * Function where the action creator related with opening the modal displaying details information of a venue.
		 *
		 */

		const openViewDetailsModal = () => {
			const { dispatch } = this.props;
			dispatch(viewDetailsModalOpen());
		};

		const handleFilterInput = e => {
			dispatch(
				formFieldChange(e.target.name, e.target.value, 'filterObject')
			);
			dispatch(searchVenues());
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
						{getNearByVenuesApiError &&
						getNearByVenuesApiError.meta &&
						getNearByVenuesApiError.meta.code ? (
							<div
								className="alert alert-danger mt-4"
								role="alert"
							>
								Cannot retrieve the data of nearby venues due to
								the occurrence of an unexpected error. So, the
								service is currently unavailable.
							</div>
						) : (
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
										{/* <h3 className="color-white mt-3 fw-400">
											OR
										</h3> */}
										{/* <button
											type="button"
											className="btn btn-danger btn-lg btn-block"
											onClick={e =>
												onSelectButtonClick(e)
											}
											disabled={isLoading || isSelecting}
											data-toggle="tooltip"
											data-placement={
												getClientWidth() > 767
													? 'right'
													: 'top'
											}
											title="Select a restaurant randomly within a radius of 1 km."
										>
											{isSelecting
												? 'Selecting...'
												: 'Select one randomly'}
										</button> */}
									</div>
								</div>
							</div>
						)}
					</div>
				</Animated>

				{venueDetailsApiError &&
					venueDetailsApiError.meta &&
					venueDetailsApiError.meta.code && (
						<Animated
							animationIn="fadeIn"
							animationOut="fadeIn"
							isVisible={true}
						>
							<div
								className="alert alert-danger mt-4"
								role="alert"
							>
								An unexpected error occurred while retrieving
								the data; please try again later.
							</div>
						</Animated>
					)}

				{isSelecting && <Loading />}

				{!isSelecting && selectedVenue && selectedVenue.details && (
					<Animated
						animationIn="fadeIn"
						animationOut="fadeIn"
						isVisible={true}
					>
						<div className="venue-container mb-3 px-4">
							<div className="row mt-5">
								<div className="col-lg-6 col-12">
									<SelectedVenue
										selectedVenue={selectedVenue}
										openViewDetailsModal={
											openViewDetailsModal
										}
										closeViewDetailsModal={
											closeViewDetailsModal
										}
										showViewDetailsModal={
											showViewDetailsModal
										}
									/>
								</div>
								<div className="col-lg-6 col-12">
									{selectedVenue && selectedVenue.location && (
										<div
											className="venue-map-container mt-4"
											id="venue-map-container"
										>
											{
												<VenueMap
													location={
														selectedVenue.location
													}
												/>
											}
										</div>
									)}
								</div>
							</div>
						</div>
					</Animated>
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
							<div className="row row-flex">
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
										<div
											className="col-lg-4 col-sm-6 col-xs-12 mt-4"
											key={index}
										>
											<SearchedVenue
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
												distance={`${(
													distance / 1000
												).toFixed(2)} KM`}
											/>
										</div>
									);
								})}
							</div>
						</div>
					</Animated>
				) : (
					undefined
				)}

				{/* {!selectedVenue.id && !filteredVenueList.length && searchFlag && (
					<Animated
						animationIn="fadeIn"
						animationOut="fadeIn"
						isVisible={true}
					>
						<div className="well mt-5 py-3">
							<h1 className="color-white text-center mb-0">
								Nothing Found
							</h1>
						</div>
					</Animated>
				)} */}

				<Notifications key={2} notifications={notifications} />
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
	home: state.home,
	notifications: state.notifications
});

export default (Home = withRouter(connect(mapStateToProps)(Home)));
