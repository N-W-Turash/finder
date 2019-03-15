import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MdRefreshCircle from 'react-ionicons/lib/MdRefreshCircle';
import { success } from 'react-notification-system-redux';
import { VenueMap, Header } from '../../components/';
import SearchForm from './components/searchForm';
import SelectedVenue from './components/selectedVenue';
import SearchedVenue from './components/searchedVenue';
import { getClientWidth } from '../../helpers';
import {
	getNearbyVenues,
	GET_NEARBY_VENUES_REQUESTS,
	removeSuccessMessage,
	formFieldChange,
	selectRandomVenue,
	GET_VENUE_DETAILS_REQUEST,
	getVenueDetails,
	searchVenues,
	viewDetailsModalOpen,
	viewDetailsModalClose
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
		const { dispatch } = this.props;
		dispatch({ type: GET_NEARBY_VENUES_REQUESTS });
		dispatch(getNearbyVenues());
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

		const { dispatch, home } = this.props;
		let {
			selectedVenue,
			isLoading,
			searchText,
			venuesList,
			isSelecting,
			searchedVenuesList,
			searchFlag,
			showViewDetailsModal,
			getNearByVenuesApiError,
			venueDetailsApiError
		} = home;

		/**
		 * Gets a random integer between 0 (inclusive) and length of the retrieved array of venues (exclusive).
		 * Dispatches necessary actions to select a venue from the retrieved list and then loads detailed data of it.
		 *
		 */

		const onSelectButtonClick = e => {
			e.preventDefault();
			let randomIndex = Math.floor(Math.random() * venuesList.length);
			dispatch(selectRandomVenue(randomIndex));
			dispatch({ type: GET_VENUE_DETAILS_REQUEST });
			dispatch(
				getVenueDetails(venuesList[randomIndex].id, 'selectedVenue')
			);
		};

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

		return (
			<section className="container">
				<Header />

				<div className="main-section">
					{getNearByVenuesApiError &&
					getNearByVenuesApiError.meta &&
					getNearByVenuesApiError.meta.code ? (
						<div className="alert alert-danger mt-4" role="alert">
							Cannot retrieve the data of nearby venues due to the
							occurrence of an unexpected error. So, the service
							is currently unavailable.
						</div>
					) : (
						<div>
							<div className="row justify-content-center mt-4">
								<div className="col-lg-6 col-md-6 col-12">
									<button
										type="button"
										className="btn btn-danger btn-lg btn-block"
										onClick={e => onSelectButtonClick(e)}
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
									</button>
								</div>
							</div>
							<h3 className="color-white mt-3 text-center fw-400">
								OR
							</h3>
							<SearchForm
								dispatch={dispatch}
								formFieldChange={formFieldChange}
								searchText={searchText}
								searchVenues={searchVenues}
							/>
						</div>
					)}
				</div>

				{venueDetailsApiError &&
					venueDetailsApiError.meta &&
					venueDetailsApiError.meta.code && (
						<div className="alert alert-danger mt-4" role="alert">
							An unexpected error occurred while retrieving the
							data; please try again later.
						</div>
					)}

				{isSelecting && (
					<div className="spinner-container">
						<MdRefreshCircle
							fontSize={getClientWidth() > 767 ? '120px' : '60px'}
							color="rgba(0, 0, 0, .7)"
							rotate={true}
						/>
					</div>
				)}

				{!isSelecting && selectedVenue && selectedVenue.details && (
					<div className="venue-container mb-3 px-4">
						<div className="row mt-5">
							<div className="col-lg-6 col-12">
								<SelectedVenue
									selectedVenue={selectedVenue}
									openViewDetailsModal={openViewDetailsModal}
									closeViewDetailsModal={
										closeViewDetailsModal
									}
									showViewDetailsModal={showViewDetailsModal}
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
				)}

				{!selectedVenue.id && searchedVenuesList.length ? (
					<div className="seareched-venues-container mb-5 px-4">
						<div className="row row-flex">
							{searchedVenuesList.map((searchedVenue, index) => {
								return (
									<div className="col-lg-4 mt-4" key={index}>
										<SearchedVenue
											searchedVenue={searchedVenue}
										/>
									</div>
								);
							})}
						</div>
					</div>
				) : (
					undefined
				)}

				{!selectedVenue.id && !searchedVenuesList.length && searchFlag && (
					<div className="well mt-5 py-3">
						<h1 className="color-white text-center mb-0">
							Nothing Found
						</h1>
					</div>
				)}
			</section>
		);
	}
}

Home.propTypes = {
	dispatch: PropTypes.func.isRequired,
	home: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	home: state.home
});

export default (Home = withRouter(connect(mapStateToProps)(Home)));
