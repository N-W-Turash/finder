import { 
    GET_NEARBY_VENUES_REQUESTS,
    GET_NEARBY_VENUES_SUCCESS,
    GET_NEARBY_VENUES_FAILURE,
    SELECT_A_RANDOM_VENUE,
    GET_SELECTED_VENUE_DATA_REQUEST,
    GET_SELECTED_VENUE_DATA_SUCCESS,
    GET_SELECTED_VENUE_DATA_FAILURE 
} from '../actions';

const initialState = {
    venuestList: [],
    selectedVenue: {},
    errorObj: {},
    isLoading: false,
    testMode: false
};

export default (state = initialState, action) => {

    // let venuestList;
    switch (action.type) {

        case GET_NEARBY_VENUES_REQUESTS:
            return {
                ...state,
                isLoading: true
            }

        case GET_NEARBY_VENUES_SUCCESS:
            return {
                ...state,
                venuestList: state.venuestList.concat(action.payload.venues),  
            }

        case GET_NEARBY_VENUES_FAILURE:  // need to be updated
            return {
                ...state,
                isLoading: false
            }

        case SELECT_A_RANDOM_VENUE:

            return {
                ...state,
                selectedVenue: state.venuestList.length ? state.venuestList[action.payload.selectedIndex] : {}
            }

        case GET_SELECTED_VENUE_DATA_REQUEST:
            
            return {
                ...state,
                isSelectedVenueDataLoading: true
            }

        case GET_SELECTED_VENUE_DATA_SUCCESS:
            
            return {
                ...state,
                selectedVenue: {
                    ...state.selectedVenue,
                    details: action.payload.details
                },
                isLoading: false
            }

        case GET_SELECTED_VENUE_DATA_FAILURE:
            return {
                ...state,
                isLoading: false
            }

        // case FORM_FIELD_CHANGE:

        //     let newObj ={ ...state[action.payload.obj] };
        //     newObj[action.payload.field] = action.payload.value;

        //     return {
        //         ...state,
        //         [action.payload.obj]: newObj
        //     };

        default:
            return state
    }
}

// export const formFieldChange = (obj, field, value) => {
//     return {
//         type: FORM_FIELD_CHANGE,
//         payload: {obj, field, value}
//     }
// };
