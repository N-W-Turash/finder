import React from 'react';
import PropTypes from 'prop-types';

export class ListItem extends React.Component {
	render() {
		/**
		 * This component gets imgSrc, text as props from the parent component.
		 * All of these props are string.
		 *
		 */

		const { imgSrc, text } = this.props;

		return (
			<li className="list-group-item">
				<div className="list-view-icon-container">
					<img src={imgSrc} alt="address" className="svg-icon-left" />
				</div>
				<div className="list-view-text-container">
					<p className="mb-0">{text}</p>
				</div>
				<div className="clearfix" />
			</li>
		);
	}
}

ListItem.propTypes = {
	imgSrc: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
};
