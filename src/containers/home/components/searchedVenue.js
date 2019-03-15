import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Marker from '../../../assets/imgs/marker.svg';
import Type from '../../../assets/imgs/type.svg';
import { ListView } from '../../../components';

export default class SearchedVenue extends React.Component {
	render() {
		/**
		 * This component gets searchedVenue(object) as a prop from the parent container.
		 *
		 */

		const { searchedVenue } = this.props;

		const listItems = [
			{
				imgSrc: Marker,
				text: searchedVenue['location.address']
					? searchedVenue['location.address']
					: `Dhaka (Details not availbale)`
			},
			{
				imgSrc: Type,
				text: searchedVenue['categories.0.name']
					? searchedVenue['categories.0.name']
					: `N/A`
			}
		];

		/**
		 * For now, the name, address and category of a searched venue is shown.
		 * We've a plan to sho more information regarding the corresponding venue
		 * in a separate page which has not been implemented yet.
		 *
		 */

		return (
			<div className="card custom-card mt-4 searched-venue-component">
				<div className="card-body fs-2">
					<h5 className="card-title uppercase fw-400 ls-title-">
						{searchedVenue.name}
					</h5>
					<ListView listItems={listItems} />
					<Link
						to={`/venue/${searchedVenue['id']}`}
						className="btn btn-info"
					>
						View Details
					</Link>
				</div>
			</div>
		);
	}
}

SearchedVenue.propTypes = {
	searchedVenue: PropTypes.object.isRequired
};
