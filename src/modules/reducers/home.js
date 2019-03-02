import flatten from 'flat';
import { 
    GET_NEARBY_VENUES_REQUESTS,
    GET_NEARBY_VENUES_SUCCESS,
    GET_NEARBY_VENUES_FAILURE,
    SELECT_A_RANDOM_VENUE,
    GET_SELECTED_VENUE_DATA_REQUEST,
    GET_SELECTED_VENUE_DATA_SUCCESS,
    GET_SELECTED_VENUE_DATA_FAILURE,
    REMOVE_SUCCESS_MESSAGE,
    FORM_FIELD_CHANGE,
    SEARCH_VENUES,
    OPEN_VIEW_DETAILS_MODAL,
    CLOSE_VIEW_DETAILS_MODAL, 
} from '../actions';

const initialState = {
    venuesList: [],
    selectedVenue: {},
    errorObj: {},
    isLoading: false,
    isSelecting: false,
    successMessage: '',
    searchText: '',
    searchedVenuesList: [],
    searchFlag: false,
    showViewDetailsModal: false,
};

/**
 * The reducer is a pure function that takes the previous state and an action, and returns the next state.
 * It's called a reducer because it's the type of function we would pass to 
 * Array.prototype.reduce(reducer, ?initialValue).
 * It's very important that the reducer stays pure. Things we should never do inside a reducer:
 * > Mutate its arguments;
 * > Perform side effects like API calls and routing transitions;
 * > Call non-pure functions, e.g. Date.now() or Math.random().
 * 
 * To know about avoiding mutation in redux being fundamental and necessary
 * this stackoverflow link might help:
 * > https://stackoverflow.com/questions/37531909/redux-why-is-avoiding-mutations-such-a-fundamental-part-of-using-it
 *
 */

export default (state = initialState, action) => {

    switch (action.type) {

        /**
         * When the action with the type 'GET_NEARBY_VENUES_REQUESTS' is dispatched.
         * Returns the new state with 'isLoading' changed from false to true.
         */

        case GET_NEARBY_VENUES_REQUESTS:
            return {
                ...state,
                isLoading: true,
            }

        /**
         * When the action with the type 'GET_NEARBY_VENUES_SUCCESS' is dispatched.
         * Returns the new state with 'venuesList' changed from an empty array to 
         * an array of objects, where each object contains the data of a specific venue
         * and 'isLoading' changed from true to false.
         */

        case GET_NEARBY_VENUES_SUCCESS:
            return {
                ...state,
                venuesList: state.venuesList.concat(action.payload.venues),  
                isLoading: false,
                errorObj: {},
            }

        /**
         * Needs to be updated later
         */

        case GET_NEARBY_VENUES_FAILURE:
            return {
                ...state,
                isLoading: false,
            }

        /**
         * When the action with the type 'SELECT_A_RANDOM_VENUE' is dispatched.
         * Returns the new state with 'selectedVenue' changed from an empty object to 
         * an object containing the data of the selected venue, using the 'selectedIndex'
         * payload of the action.
         */

        case SELECT_A_RANDOM_VENUE:

            return {
                ...state,
                selectedVenue: state.venuesList.length ? state.venuesList[action.payload.selectedIndex] : {},
                isSelecting: true,
            }

        /**
         * When the action with the type 'GET_SELECTED_VENUE_DATA_REQUEST' is dispatched.
         * Returns just the new state.
         */

        case GET_SELECTED_VENUE_DATA_REQUEST:
            
            return {
                ...state,
            }

        /**
         * When the action with the type 'GET_SELECTED_VENUE_DATA_SUCCESS' is dispatched.
         * Returns the new state with 'selectedVenue' changed as a new object called 
         * 'details' gets appended to it as a property which gets provided by the action's
         * payload and along with changed 'successMessage' ('' to 'A venue..'), 
         * 'isSelecting' (true to false), 'searchedVenuesList' (to []),
         * isLoading (true to false).
         * 
         */

        case GET_SELECTED_VENUE_DATA_SUCCESS:
            
            return {
                ...state,
                selectedVenue: {
                    ...state.selectedVenue,
                    details: action.payload.details,
                },
                successMessage: 'A venue has been selected for you!',
                isSelecting: false,
                searchedVenuesList: [],
                isLoading: false,
                errorObj: {},
            }

        /**
         * When the action with the type 'GET_SELECTED_VENUE_DATA_FAILURE' is dispatched.
         * Returns the new state with 'isLoading' and 'isSelecting' (both true to false). 
         */

        case GET_SELECTED_VENUE_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                isSelecting: false,
                errorObj: action.payload.errorObject,
            }

        /**
         * When the action with the type 'REMOVE_SUCCESS_MESSAGE' is dispatched.
         * Returns the new state with 'selectedVenue' changed to ''.
         */

        case REMOVE_SUCCESS_MESSAGE:
            return {
                ...state,
                successMessage: '',
            };

        /**
         * When the action with the type 'FORM_FIELD_CHANGE' is dispatched.
         * Returns the new state with '[action.payload.fieldName]' (searchText) 
         * changed to the value of another payload 'value'.
         * 
         */

        case FORM_FIELD_CHANGE:
            return {
                ...state,
                [action.payload.fieldName]: action.payload.value,
            };


        /**
         * When the action with the type 'SEARCH_VENUES' is dispatched.
         * Before performing the search operation, it flattens each object depicting
         * data of a venue like {x: {a: b}} becomes {x.a: b} to make the operation easier.
         * Then it trims the search text and creates a js RegExp intance usign it's 
         * constructor.
         * For now, the search operation is performed based on the venue's name, address 
         * and category.
         * Returns the new state with 'searchedVenuesList' changed from an empty array to 
         * an array containing objects depicting matched venue according the search text, 
         * 'searchFlag' (false to true), 'selectedVenue' to an empty object.
         * 
         */

        case SEARCH_VENUES:
            let newVenueList = state.venuesList.concat([]);
            let searchedVenuesList = [];
            newVenueList.forEach((venue, index) => {
                searchedVenuesList.push(flatten(venue));
            });
          
            searchedVenuesList= searchedVenuesList.filter((venue, index) => {
                let text = action.payload.searchText;
                let regex = new RegExp(text.trim(), 'ig');
                if(text.trim() !== "") {
                    if(regex.test(venue['name']) || regex.test(venue['location.address']) || regex.test(venue['categories.0.name'])) {
                        return venue;
                    }
                }
                return 0;
            });
            return {
                ...state,
                searchedVenuesList: searchedVenuesList,
                searchFlag: true,
                selectedVenue: {},
                errorObj: {},
            };

        /**
         * When the action with the type 'OPEN_VIEW_DETAILS_MODAL' is dispatched.
         * Returns the new state with 'showViewDetailsModal' changed from false to true.
         */

        case OPEN_VIEW_DETAILS_MODAL:
            return {
                ...state,
                showViewDetailsModal: true,
            };

        /**
         * When the action with the type 'CLOSE_VIEW_DETAILS_MODAL' is dispatched.
         * Returns the new state with 'showViewDetailsModal' changed from true to false.
         */

        case CLOSE_VIEW_DETAILS_MODAL:
            return {
                ...state,
                showViewDetailsModal: false,
            };

        default:
            return state;
    }
}

