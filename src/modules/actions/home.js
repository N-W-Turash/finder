import axios from 'axios';
import { getNearbyVenuesUrl, getSelectedVenueDetailsUrl } from '../../helpers';

/**
 * Actions are payloads of information that send data from the application to the store.
 * They are the only source of information for the store.
 *
 * When we call an asynchronous API, there are two crucial moments in time:
 * the moment we start the call, and the moment when we receive an answer.
 * Usually, for any API request we'll want to dispatch at least three different kinds of actions:
 * An action informing the reducers that the request began.
 * An action informing the reducers that the request finished successfully.
 * An action informing the reducers that the request failed.
 *
 */

/**
 * Three action types to make request to foursqare places API
 * to get the list of nearby venues, handle successful finishing of the request
 * and handle failure of the request.
 *
 */

export const GET_NEARBY_VENUES_REQUESTS = 'home/GET_NEARBY_VENUES_REQUESTS';
export const GET_NEARBY_VENUES_SUCCESS = 'home/GET_NEARBY_VENUES_SUCCESS';
export const GET_NEARBY_VENUES_FAILURE = 'home/GET_NEARBY_VENUES_FAILURE';

/**
 * Three action types to make request to foursqare places API to get deatils
 * of the selected venue, handle successful finishing of the request
 * and handle failure of the request.
 *
 */

export const GET_VENUE_DETAILS_REQUEST = 'home/GET_VENUE_DETAILS_REQUEST';
export const GET_VENUE_DETAILS_SUCCESS = 'home/GET_VENUE_DETAILS_SUCCESS';
export const GET_VENUE_DETAILS_FAILURE = 'home/GET_VENUE_DETAILS_FAILURE';

/**
 * Action type to handle the search venue form field change.
 *
 */

export const FORM_FIELD_CHANGE = 'home/FORM_FIELD_CHANGE';

/**
 * Action type to handle searching venues based on certain keywords
 * and retrieving a list of matched venues.
 *
 */

export const SEARCH_VENUES = 'home/SEARCH_VENUES';

/**
 * Action types to handle opening and closing of the modal where
 * a user can see the details of the selected venue.
 *
 */

export const OPEN_VIEW_DETAILS_MODAL = 'home/OPEN_VIEW_DETAILS_MODAL';
export const CLOSE_VIEW_DETAILS_MODAL = 'home/CLOSE_VIEW_DETAILS_MODAL';

export const AREA_SELECT_FIELD_CHANGE = 'home/AREA_SELECT_FIELD_CHANGE';
export const INPUT_RANGE_FIELD_CHANGE = 'home/INPUT_RANGE_FIELD_CHANGE';

/**
 * Action creators are exactly that—functions that create actions.
 * They can both be synchronous and asynchronous.
 *
 * Redux Thunk middleware allows us to write action creators
 * that return a function instead of an action.
 *
 */

/**
 * 'getNearbyVenues' is an asynchronous action creator to handle the api calls to foursquare
 * places API to retrieve a list of nearby venues.
 *
 * If the request completes successfully; it dispatches the 'getNearbyVenuesSuccess' action
 * creator with the list of retireved venues as the payload which will be processed by the
 * corresponding reducer.
 *
 * If the request fails; it dispatches the 'getNearbyVenuesFailure' action creator with
 * the error object as the payload which will be processed by the corresponding reducer.
 *
 */

export const getNearbyVenues = (latLng, radius) => {
	return dispatch => {
		return axios
			.get(getNearbyVenuesUrl(latLng, radius))
			.then(res => {
				let venues = res.data.response.venues;
				dispatch(getNearbyVenuesSuccess(venues));
			})
			.catch(error => {
				if (error.response) {
					let errors = error.response.data;
					dispatch(getNearbyVenuesFailure(errors));
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('Error', error.message);
				}
			});
	};
};

export const getNearbyVenuesSuccess = venues => {
	return {
		type: GET_NEARBY_VENUES_SUCCESS,
		payload: {
			venues
		}
	};
};

export const getNearbyVenuesFailure = response => {
	return {
		type: GET_NEARBY_VENUES_FAILURE,
		payload: {
			response
		}
	};
};

/**
 * 'getVenueDetails' is an asynchronous action creator to handle the api calls to foursquare
 * places API to get the details of a venue.
 *
 * If the request completes successfully; it dispatches the 'getVenueDetailsSuccess' action
 * creator with the retrieved data as the payload which will be processed by the
 * corresponding reducer.
 *
 * If the request fails; it dispatches the 'getVenueDetailsFailure' action creator with
 * the errors object as the payload which will be processed by the corresponding reducer.
 *
 */

export const getVenueDetails = (venueId, parentObject) => {
	return dispatch => {
		return axios
			.get(getSelectedVenueDetailsUrl(venueId))
			.then(res => {
				let details = res.data.response;
				dispatch(getVenueDetailsSuccess(details, parentObject));
			})
			.catch(error => {
				if (error.response) {
					let errors = error.response.data;
					dispatch(getVenueDetailsFailure(errors));
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('Error', error.message);
				}
			});
	};
};

export const getVenueDetailsSuccess = (details, parentObject) => {
	return {
		type: GET_VENUE_DETAILS_SUCCESS,
		payload: {
			details,
			parentObject
		}
	};
};

export const getVenueDetailsFailure = venueDetailsApiError => {
	return {
		type: GET_VENUE_DETAILS_FAILURE,
		payload: {
			venueDetailsApiError
		}
	};
};

/**
 * 'formFieldChange' is an action creator which gets dispatched when a user types something in the
 * input field of the venue search form. It has two strings as it's payload, name 'fieldName'
 * and 'value'. A dynamic approach has been taken like 'fieldName' is the name attribute of
 * that input field and 'value' is the value attribute of that field. The 'fieldName' gets set
 * as a property of the state object of our app along with 'value' as it's value.
 *
 */

export const formFieldChange = (fieldName, value, formName) => {
	return {
		type: FORM_FIELD_CHANGE,
		payload: {
			fieldName,
			value,
			formName
		}
	};
};

/**
 * 'searchVenues' is an action creator which gets dispatched when the search form gets submitted.
 * It passes it's payload 'searchText' to the corresponding reducer which processes a list of
 * venues based on the 'searchText'.
 *
 */

export const searchVenues = () => {
	return {
		type: SEARCH_VENUES
	};
};

/**
 * 'viewDetailsModalOpen' and 'viewDetailsModalClose' are two action creators two handle the opening
 * and closing of the modal where the detailed data of the selected venue is shown.
 *
 */

export function viewDetailsModalOpen() {
	return {
		type: OPEN_VIEW_DETAILS_MODAL
	};
}

export function viewDetailsModalClose() {
	return {
		type: CLOSE_VIEW_DETAILS_MODAL
	};
}

export const areaSelectFieldChange = (data, fieldName, formObjectName) => {
	return {
		type: AREA_SELECT_FIELD_CHANGE,
		payload: {
			data,
			fieldName,
			formObjectName
		}
	};
};

export const inputRangetFieldChange = (value, fieldName, formObjectName) => {
	return {
		type: INPUT_RANGE_FIELD_CHANGE,
		payload: {
			value,
			fieldName,
			formObjectName
		}
	};
};
