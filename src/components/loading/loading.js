import React from 'react';
import MdRefreshCircle from 'react-ionicons/lib/MdRefreshCircle';
import { getClientWidth } from '../../helpers';

/**
 * This component is used to sho a loading spinner when am asynchronous
 * operation is going on.
 *
 */

export class Loading extends React.Component {
	render() {
		const { paddingTop } = this.props;

		return (
			<div
				className="spinner-container"
				style={{ paddingTop: paddingTop }}
			>
				<MdRefreshCircle
					fontSize={getClientWidth() > 767 ? '100px' : '60px'}
					color="rgba(0, 0, 0, .7)"
					rotate={true}
				/>
			</div>
		);
	}
}
