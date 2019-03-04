/**
 * resolveVenueData funtion take an object as it's parameter and return another object 
 * containing data about a venue's name, description, address, category, phone and  image source.
 * 
 */

export const resolveVenueData = (venue) => {
    let venueData = {};
    venueData = {
        name: venue.name ? venue.name : "N/A",
        description: venue.description ? venue.description : "Description Not Available",
        address: venue.location && venue.location.address ? venue.location.address : "Dhaka (Details not availbale)",
        categoryName: venue.categories && venue.categories[0].name ? venue.categories[0].name: "N/A",
        phone: venue.contact && venue.contact.phone ? venue.contact.phone : "N/A",
        imgSrc: venue.bestPhoto ?  `${venue.bestPhoto.prefix}500x300${venue.bestPhoto.suffix}` : false,
    };
    
    return venueData;
}