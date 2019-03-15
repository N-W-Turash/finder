import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '../index';

export class ListView extends React.Component {
	render() {
		/**
		 * This component gets address, categoryName, phone as props from the parent component.
		 * All of these props are string.
		 *
		 */

		const { listItems } = this.props;

		return (
			<ul className="list-group custom-list-group list-group-flush mb-2">
				{listItems.map((listItem, index) => {
					return (
						<ListItem
							imgSrc={listItem.imgSrc}
							text={listItem.text}
							key={index}
						/>
					);
				})}
			</ul>
		);
	}
}

ListView.propTypes = {
	listItems: PropTypes.array.isRequired
};
