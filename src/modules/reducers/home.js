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
};

export default (state = initialState, action) => {

    switch (action.type) {

        case GET_NEARBY_VENUES_REQUESTS:
            return {
                ...state,
                isLoading: true,
            }

        case GET_NEARBY_VENUES_SUCCESS:
            return {
                ...state,
                venuesList: state.venuesList.concat(action.payload.venues),  
                isLoading: false,
            }

        case GET_NEARBY_VENUES_FAILURE:  // need to be updated
            return {
                ...state,
                isLoading: false,
            }

        case SELECT_A_RANDOM_VENUE:

            return {
                ...state,
                selectedVenue: state.venuesList.length ? state.venuesList[action.payload.selectedIndex] : {},
                isSelecting: true,
            }

        case GET_SELECTED_VENUE_DATA_REQUEST:
            
            return {
                ...state,
            }

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
            }

        case GET_SELECTED_VENUE_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                isSelecting: false,
            }

        case REMOVE_SUCCESS_MESSAGE:
            return {
                ...state,
                successMessage: '',
            };

        /**
         * 
         * 
         */

        case FORM_FIELD_CHANGE:
            return {
                ...state,
                [action.payload.fieldName]: action.payload.value,
            };


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
                selectedVenue: {}
            };

        default:
            return state;
    }
}

