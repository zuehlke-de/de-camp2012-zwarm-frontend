function MapView() {
	
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
	

	var myLocationAnnotation = Titanium.Map.createAnnotation({
		// @TODO replace static location with gps provided location
		// 50.303348,9.747989
		latitude : 50.303363,
		longitude : 9.747978,
		title : "Me",
		subtitle : 'My current location',
		pincolor : Titanium.Map.ANNOTATION_RED,
		myid : 1 // Custom property to uniquely identify this annotation.
	});

	var mapview = Titanium.Map.createView({
		mapType : Titanium.Map.STANDARD_TYPE,
		region : {
			latitude : 50.303348,
			longitude : 9.747989,
			latitudeDelta : 0.01,
			longitudeDelta : 0.01
		},
		animate : true,
		regionFit : true,
		userLocation : true,
		annotations : [myLocationAnnotation]
	}); 

	
	self.add(mapview);
	
	return self;
	
};

module.exports = MapView;