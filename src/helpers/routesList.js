import Home from "../containers/home";
import SearchedVenueDetails from "../containers/searchedVenueDetails";
import NotFound from "../containers/404";

/**
 * We import all the route components here and place them in this array of objects.
 * We export this array to other files so utlize it like the RouterComponents use this
 * as a prop.
 * 
 */

export const routesList = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/venue/:id',
        component: SearchedVenueDetails,
    },
    {
        path: '*',
        component: NotFound,
    },
];