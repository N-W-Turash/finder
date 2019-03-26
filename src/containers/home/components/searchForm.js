import React from 'react';
import PropTypes from 'prop-types';
import MdSearch from 'react-ionicons/lib/MdSearch';
import Select from 'react-select';
import InputRange from 'react-input-range';
import { getSelectFieldData } from '../../../helpers';

const selectFieldDataList = getSelectFieldData();

export default class SearchForm extends React.Component {
	render() {
		/**
		 * This component gets dispatch(function), formFieldChange(function), searchText(string)
		 * and searchVenues(function) as props from the parent container.
		 *
		 */

		const {
			dispatch,
			// formFieldChange,
			searchFormObject,
			// searchVenues,
			areaSelectFieldChange,
			inputRangetFieldChange,
			GET_NEARBY_VENUES_REQUESTS,
			getNearbyVenues
		} = this.props;

		const {
			selectedAreaData: { value },
			radius
		} = searchFormObject;

		/**
		 * This default action of the form submission is prevented and an
		 * action regarding searching the venues has been dispatched instead.
		 *
		 */

		const handleSubmit = e => {
			e.preventDefault();
			dispatch({ type: GET_NEARBY_VENUES_REQUESTS });
			dispatch(getNearbyVenues(value, radius * 1000));
			// dispatch(searchVenues(searchFormObject.searchText));
		};

		return (
			<div className="form-container">
				<form>
					<div className="form-row">
						<div className="col-lg-12 col-12">
							<label className="color-white font-2 uppercase">
								<small>Select an Area</small>
							</label>
							<Select
								options={selectFieldDataList}
								className="mb-3"
								name="selectedAreaData"
								onChange={(data, action) => {
									dispatch(
										areaSelectFieldChange(
											data,
											action.name,
											'searchFormObject'
										)
									);
								}}
								value={selectFieldDataList.find(
									data =>
										data.value ===
										searchFormObject.selectedAreaData.value
								)}
							/>
							<label className="color-white font-2 mb-3 uppercase">
								<small>
									Select Range (KM) (Defaults to 2 KM)
								</small>
							</label>
							<InputRange
								maxValue={5}
								minValue={1}
								value={searchFormObject.radius}
								name="radius"
								onChange={value => {
									dispatch(
										inputRangetFieldChange(
											value,
											'radius',
											'searchFormObject'
										)
									);
								}}
							/>
							<button
								type="submit"
								className="btn btn-danger mb-2 mt-2"
								disabled={
									!searchFormObject.selectedAreaData.value ||
									!searchFormObject.radius
								}
								onClick={e => handleSubmit(e)}
							>
								Search
								<MdSearch
									fontSize="20px"
									color="#ffffff"
									style={{
										marginLeft: '3px',
										marginTop: '-3px'
									}}
								/>
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

SearchForm.propTypes = {
	dispatch: PropTypes.func.isRequired,
	formFieldChange: PropTypes.func.isRequired,
	searchFormObject: PropTypes.object.isRequired,
	searchVenues: PropTypes.func.isRequired,
	areaSelectFieldChange: PropTypes.func.isRequired,
	inputRangetFieldChange: PropTypes.func.isRequired,
	getNearbyVenues: PropTypes.func.isRequired,
	GET_NEARBY_VENUES_REQUESTS: PropTypes.string.isRequired
};
