import React from 'react';
import MdRestaurant from 'react-ionicons/lib/MdRestaurant';
import { Animated } from 'react-animated-css';
import { getClientWidth } from '../../helpers';

export class Header extends React.Component {
	render() {
		return (
			<Animated
				animationIn="fadeIn"
				animationOut="fadeIn"
				isVisible={true}
			>
				<div className="header-section mb-4 text-center">
					<h3 className="mb-2 fw-400 color-white text-center ls-title uppercase fw-400 mt-2 d-inline-block">
						<MdRestaurant
							fontSize={getClientWidth() > 767 ? '60px' : '30px'}
							color="#ffffff"
							style={{ marginRight: '10px', marginTop: '-5px' }}
						/>
						FINDER
					</h3>
					<h5 className="color-white mt-0 mb-3 fs-2 fw-400">
						Find Appropriate Venue For Having Lunch/Dinner Around
						Specific Areas At Dhaka
					</h5>
				</div>
			</Animated>
		);
	}
}
