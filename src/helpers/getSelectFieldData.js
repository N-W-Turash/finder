const locations = [
	{
		name: 'Banani, Dhaka',
		lat: 23.7939927,
		lng: 90.40427190000003
	},
	{
		name: 'Gulshan 1, Dhaka',
		lat: 23.7820624,
		lng: 90.41605270000002
	},
	{
		name: 'Gulshan 2, Dhaka',
		lat: 23.7969427,
		lng: 90.4136962
	},
	{
		name: 'Baridhara, Dhaka',
		lat: 23.7998984,
		lng: 90.42076599999996
	},
	{
		name: 'Uttara, Dhaka',
		lat: 23.876317,
		lng: 90.380026
	},
	{
		name: 'Dhanmondi 27, Dhaka',
		lat: 23.7561898,
		lng: 90.37557219999997
	},
	{
		name: 'Lalmatia, Dhaka',
		lat: 23.75540729999999,
		lng: 90.3689508
	},
	{
		name: 'Mirpur 10, Dhaka',
		lat: 23.806744,
		lng: 90.36855489999994
	},
	{
		name: 'Shyamoli, Dhaka',
		lat: 23.7717833,
		lng: 90.363067
	},
	{
		name: 'Khilgaon, Dhaka',
		lat: 23.7566389,
		lng: 90.4643906
	}
];

export const getSelectFieldData = () => {
	let selectFieldList = [];
	locations.map(location => {
		return selectFieldList.push({
			label: location.name,
			value: `${location.lat},${location.lng}`
		});
	});

	return selectFieldList;
};
