import { 
    GET_NEARBY_VENUES_REQUESTS,
    GET_NEARBY_VENUES_SUCCESS,
    GET_NEARBY_VENUES_FAILURE,
    SELECT_A_RANDOM_VENUE, 
} from '../actions';

const initialState = {
    venuestList: [],
    selectedVenue: {},
    isLoading:false,
    errorObj: {}
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
                isLoading: false  
            }

        case GET_NEARBY_VENUES_FAILURE:
            return {
                ...state,
                errorObj: {}, // need to be updated
                isLoading: false
            }

        case SELECT_A_RANDOM_VENUE:

            return {
                ...state,
                selectedVenue: state.venuestList.length ? state.venuestList[action.payload.selectedIndex] : {}
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
