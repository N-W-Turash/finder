import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Marker from '../../../assets/imgs/marker.svg';
import Type from '../../../assets/imgs/type.svg';
import Distance from '../../../assets/imgs/distance.svg';
import { ListView } from '../../../components';

export default class SearchedVenue extends React.Component {
	render() {
		/**
		 * This component gets id, name, address, category as  props from the parent container.
		 *
		 */

		const { id, name, address, category, distance } = this.props;

		const listItems = [
			{
				imgSrc: Marker,
				text: address
			},
			{
				imgSrc: Type,
				text: category
			},
			{
				imgSrc: Distance,
				text: distance
			}
		];

		/**
		 * For now, the name, address and category of a searched venue is shown.
		 * We've a plan to sho more information regarding the corresponding venue
		 * in a separate page which has not been implemented yet.
		 *
		 */

		return (
			<div className="card custom-card searched-venue-component">
				<div className="card-body fs-2">
					<h5 className="card-title uppercase fw-400 ls-title-">
						{name}
					</h5>
					<ListView listItems={listItems} />
					<Link to={`/venue/${id}`} className="btn btn-info">
						View Details
					</Link>
				</div>
			</div>
		);
	}
}

SearchedVenue.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	distance: PropTypes.string.isRequired
};
