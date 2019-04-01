/**
 * We've used foursquare places api to get the data of nearby venues (within 1km approx.).
 * The following parameters were provided.
 *
 * latitudeAndLongitude (ll): Latitude and Longitude of the current location (Ahmed Tower, Banani).
 * categoryId: Category of the venue, as we're looking for nearby venues for
 * versionDate (v): Versioning is controlled by the v parameter, which is a date that represents
 * the “version” of the API for which we expect from Foursquare.
 * having team party we've used the category ID of food.
 * radius: Limit results to venues within this many meters of the specified location,
 * in this case it's 1000m (1km)
 * intent: This indicates our intent in performing the search.
 * The value 'checkin' refers to finds venues that the current user
 * (or, for userless requests, a typical user) is likely to checkin to at the provided ll.
 * clientId & clientSecret: To make a userless request to foursquare API, we need to
 * specify our consumer key’s Client ID and Secret instead of an auth token in the request URL.
 * Though it's just a client side app, for depicting better practises I've kept these two
 * parameters in a .env file.
 *
 */

const searchApiUrl = 'https://api.foursquare.com/v2/venues/search';
const categoryId = '4d4b7105d754a06374d81259';
const versionDate = '20190304';
const intent = 'checkin';
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

/**
 * The api endpoint to get details of a venue also needs to be provided with the
 * clientID, clientSecret, v along with the venueId parameter.
 *
 */

const venueDetailsAPiUrl = 'https://api.foursquare.com/v2/venues/';

export const getNearbyVenuesUrl = (latLng, radius) => {
	return `${searchApiUrl}?ll=${latLng}&categoryId=${categoryId}&intent=${intent}&radius=${radius}&client_id=${clientId}&client_secret=${clientSecret}&v=${versionDate}`;
};

export const getSelectedVenueDetailsUrl = venueId => {
	return `${venueDetailsAPiUrl}${venueId}?&client_id=${clientId}&client_secret=${clientSecret}&v=${versionDate}`;
};
