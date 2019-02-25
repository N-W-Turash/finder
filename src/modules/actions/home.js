export const SELECT_A_RANDOM_RESTAURANT = "home/SELECT_A_RANDOM_RESTAURANT";

export const selectRandomRestaurant = () => {
    return {
        type: SELECT_A_RANDOM_RESTAURANT,
        payload: {}
    }
};