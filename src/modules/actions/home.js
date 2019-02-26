import axios from 'axios';

const searchUrl = "https://api.foursquare.com/v2/venues/search";
const latitudeAndLongitude = "23.793727655392733,90.4045502929657"; // ahmed tower
const categoryId = "4d4b7105d754a06374d81259"; // food
const versionDate = "20190201"; // api version date
const radius = 1000; // limit results to venues within 1km
const intent= 'checkin';
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const findRestaurantssUrl = `${searchUrl}?ll=${latitudeAndLongitude}&categoryId=${categoryId}&intent=${intent}&radius=${radius}&client_id=${clientId}&client_secret=${clientSecret}&v=${versionDate}`;


export const GET_NEARBY_RESTAURANTS_REQUESTS = "home/GET_NEARBY_RESTAURANTS_REQUESTS";
export const GET_NEARBY_RESTAURANTS_SUCCESS = "home/GET_NEARBY_RESTAURANTS_SUCCESS";
export const GET_NEARBY_RESTAURANTS_FAILURE = "home/GET_NEARBY_RESTAURANTS_FAILURE";

export const SELECT_A_RANDOM_RESTAURANT = "home/SELECT_A_RANDOM_RESTAURANT";


export const getNearbyRestaurantsRequests = () => {

    return dispatch => {
        return axios.get(findRestaurantssUrl)
            .then(res => {
                dispatch(getNearbyRestaurantsSuccess(res.data.response.venues));
                dispatch(selectRandomRestaurant());
            })
            .catch((error) => {

                if (error.response) {
                    let errors = error.response.data;
                    dispatch(getNearbyRestaurantsFailure(errors));
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

export const getNearbyRestaurantsSuccess = (venues) => {
    return {
        type: GET_NEARBY_RESTAURANTS_SUCCESS,
        payload : {
            venues
        }
    }
};

export const getNearbyRestaurantsFailure = (response) => {
    return {
        type: GET_NEARBY_RESTAURANTS_FAILURE,
        payload : {
            response
        }
    }
};

export const selectRandomRestaurant = () => {
    return {
        type: SELECT_A_RANDOM_RESTAURANT,
        payload: {}
    }
};

