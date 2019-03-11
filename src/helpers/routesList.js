import Home from "../containers/home";
import SearchedVenueDetails from "../containers/searchedVenueDetails";
import NotFound from "../containers/404";

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