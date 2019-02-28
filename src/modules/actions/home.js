import axios from 'axios';

const searchUrl = "https://api.foursquare.com/v2/venues/search";
const latitudeAndLongitude = "23.793727655392733,90.4045502929657"; // ahmed tower
const categoryId = "4d4b7105d754a06374d81259"; // food
const versionDate = "20190201"; // api version date
const radius = 1000; // limit results to venues within 1km
const intent= 'checkin';
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const getVenuesUrl = `${searchUrl}?ll=${latitudeAndLongitude}&categoryId=${categoryId}&intent=${intent}&radius=${radius}&client_id=${clientId}&client_secret=${clientSecret}&v=${versionDate}`;

export const GET_NEARBY_VENUES_REQUESTS = "home/GET_NEARBY_VENUES_REQUESTS";
export const GET_NEARBY_VENUES_SUCCESS = "home/GET_NEARBY_VENUES_SUCCESS";
export const GET_NEARBY_VENUES_FAILURE = "home/GET_NEARBY_VENUES_FAILURE";

export const SELECT_A_RANDOM_VENUE = "home/SELECT_A_RANDOM_VENUE";

export const GET_SELECTED_VENUE_DATA_REQUEST = "home/GET_SELECTED_VENUE_DATA_REQUEST";
export const GET_SELECTED_VENUE_DATA_SUCCESS = "home/GET_SELECTED_VENUE_DATA_SUCCESS";
export const GET_SELECTED_VENUE_DATA_FAILURE = "home/GET_SELECTED_VENUE_DATA_FAILURE";

export const REMOVE_SUCCESS_MESSAGE = "home/REMOVE_SUCCESS_MESSAGE";

export const getNearbyVenues = () => {

    return dispatch => {
        return axios.get(getVenuesUrl)
            .then(res => {
                let venues = res.data.response.venues
                dispatch(getNearbyVenuesSuccess(venues));
                let randomIndex = Math.floor(Math.random()*venues.length);
                dispatch(selectRandomVenue(randomIndex));
                dispatch({type: GET_SELECTED_VENUE_DATA_REQUEST});
                dispatch(getSelectedVenueData(venues[randomIndex].id));
            })
            .catch((error) => {

                if (error.response) {
                    let errors = error.response.data;
                    dispatch(getNearbyVenuesFailure(errors));
                }
                else if (error.request) {
                    console.log(error.request);
                }
                else {
                    console.log('Error', error.message);
                }
            });
    }
};

export const getNearbyVenuesSuccess = (venues) => {
    return {
        type: GET_NEARBY_VENUES_SUCCESS,
        payload : {
            venues
        }
    }
};

export const getNearbyVenuesFailure = (response) => {
    return {
        type: GET_NEARBY_VENUES_FAILURE,
        payload : {
            response
        }
    }
};

export const selectRandomVenue = (selectedIndex) => {
    return {
        type: SELECT_A_RANDOM_VENUE,
        payload: { selectedIndex }
    }
};

export const getSelectedVenueData = (venueId) => {

    const getSlectedVenueDetailsurl = `https://api.foursquare.com/v2/venues/${venueId}?&client_id=${clientId}&client_secret=${clientSecret}&v=${versionDate}`;

    return dispatch => {
        return axios.get(getSlectedVenueDetailsurl)
            .then(res => {
                let details = res.data.response;
                dispatch(getSelectedvenueDataSuccess(details));
            })
            .catch((error) => {

                if (error.response) {
                    let errors = error.response.data;
                    dispatch(getNearbyVenuesFailure(errors));
                }
                else if (error.request) {
                    console.log(error.request);
                }
                else {
                    console.log('Error', error.message);
                }
            });
    }
};

export const getSelectedvenueDataSuccess = (details) => {
    return {
        type: GET_SELECTED_VENUE_DATA_SUCCESS,
        payload : {
            details
        }
    }
};

export const getSelectedvenueDataFailure = (response) => {
    return {
        type: GET_SELECTED_VENUE_DATA_FAILURE,
        payload : {
            response
        }
    }
};

export const removeSuccessMessage = () => {
    return {
        type: REMOVE_SUCCESS_MESSAGE,
        payload: {}
    }
};



