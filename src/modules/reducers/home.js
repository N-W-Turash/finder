import { 
    GET_NEARBY_RESTAURANTS_REQUESTS,
    GET_NEARBY_RESTAURANTS_SUCCESS,
    GET_NEARBY_RESTAURANTS_FAILURE,
    SELECT_A_RANDOM_RESTAURANT, 
} from '../actions';

const initialState = {
    restaurantList: [],
    selectedRestaurant: {},
    isLoading:false,
    errorObj: {}
};

export default (state = initialState, action) => {

    // let restaurantList;
    switch (action.type) {

        case GET_NEARBY_RESTAURANTS_REQUESTS:
            return {
                ...state,
                isLoading: true
            }

        case GET_NEARBY_RESTAURANTS_SUCCESS:
            return {
                ...state,
                restaurantList: state.restaurantList.concat(action.payload.venues)  
            }

        case GET_NEARBY_RESTAURANTS_FAILURE:
            return {
                ...state,
                errorObj: {} // need to be updated
            }

        case SELECT_A_RANDOM_RESTAURANT:

            return {
                ...state,
                selectedRestaurant: state.restaurantList.length ? state.restaurantList[Math.floor(Math.random()*state.restaurantList.length)] : {}
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
