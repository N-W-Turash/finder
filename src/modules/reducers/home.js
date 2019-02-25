import { 
    SELECT_A_RANDOM_RESTAURANT, 
} from '../actions';

const initialState = {
    ll: '23.794121, 90.405081',
    restaurants: [],
    selectedRestaurant: ''
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SELECT_A_RANDOM_RESTAURANT:

        return {
            ...state,
            selectedRestaurant: 'Test value restaurant!'
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

// export const getNearbyRestaurants = () => {

//     return dispatch => {
//         return axios.get(`$(url)`)
//             .then(response => {
//                 dispatch(getNearbyRestaurantsSuccess(response.data));
//             })
//             .catch((error) => {

//                 if(error.response){
//                     let errors = error.response.data;
//                     dispatch(getNearbyRestaurantsFailure(errors));
//                 }
//                 else if (error.request) {
//                     console.log(error.request);
//                 }
//                 else {
//                     console.log('Error', error.message);
//                 }
//             });
//     }
// };
