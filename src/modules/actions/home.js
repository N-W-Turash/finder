const searchUrl = "https://api.foursquare.com/v2/venues/search";
const latitudeAndLongitude = "23.793727655392733,90.4045502929657"; // ahmed tower
const categoryId = "4d4b7105d754a06374d81259"; // food
const versionDate= "20190201";
const clientId = "RNS4M4KMBGSNZNZZDCJWFDZNC1IMYDZQLFWK511EKR3ICYWW";
const clientSecret = "JAYHW2W0P02R3YMMK5EIEPKGBFT4IIJA54OMM1YQOZ2XSZQZ";

const findRestaurantssUrl = `${searchUrl}?ll=${latitudeAndLongitude}&categoryId=${categoryId}&client_id=${clientId}&client_secret=${clientSecret}&v=${versionDate}`

export const SELECT_A_RANDOM_RESTAURANT = "home/SELECT_A_RANDOM_RESTAURANT";

export const selectRandomRestaurant = () => {
    return {
        type: SELECT_A_RANDOM_RESTAURANT,
        payload: {}
    }
};