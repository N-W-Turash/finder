import React from 'react';
import { Animated } from 'react-animated-css';
import PropTypes from 'prop-types';

export class ErrorDisplay extends React.Component {
	render() {
		const { errorMessage } = this.props;

		return (
			<Animated
				animationIn="fadeIn"
				animationOut="fadeIn"
				isVisible={true}
			>
				<div className="alert alert-danger mt-4" role="alert">
					{errorMessage}
				</div>
			</Animated>
		);
	}
}

ErrorDisplay.propTypes = {
	errorMessage: PropTypes.string.isRequired
};
