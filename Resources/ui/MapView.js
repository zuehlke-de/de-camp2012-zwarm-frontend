function MapView() {
	
	var SwarmClient = require('network/SwarmClient');
	var client = null;
	
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
	
	// Time in ms for periodical update of nearby users
	self.NEARBY_INTERVAL_MS = 5000;

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
		annotations : []
	}); 

	// register for location changes
	Ti.App.addEventListener('zwarm.location.updated', function(coords) {
		mapview.setLocation({
			latitude : coords.latitude,
			longitude : coords.longitude,
			latitudeDelta : 0.01,
			longitudeDelta : 0.01,
			animate : true
		}); 
	});
	
	
	// PRIVATE FUNCTION
	/**
	 * Set the nearby users to show on the map.
	 * @param {Object} a collection of users nearby
	 */
	self.setNearbyUsers = function (users) {
		// user: {nickname: bla, location: {latitude: xxx, longitude: xxx}}
		if(users && users.length && users.length >= 0) {
			var nearbyUsersAnnotations = [];
			// reset mapview annotations
			mapview.removeAllAnnotations();
			for (key in users) {
				var user = users[key];
				var annotation = Titanium.Map.createAnnotation({
					latitude : user.location.latitude,
					longitude : user.location.longitude,
					title : user.nickname,
					pincolor : Titanium.Map.ANNOTATION_RED,
					myid : key
				});
				nearbyUsersAnnotations.push(annotation);
			}
			// update mapview annotations
			mapview.addAnnotations(nearbyUsersAnnotations);
		} else {
			// no users -> no 
			mapview.removeAllAnnotations();
		}
	};
	
	/**
	 * PRIVATE FUNCTION
	 * 
	 * Loads nearby users for the currently logged in user.
	 */
	self.updateNearbyUsers = function () {
		
		var userId = Ti.App.Properties.getString('user.id');
		
		if(client === null) {
			client = new SwarmClient();
		}
		
		client.getNearbyUsersForUser(userId, function(jsonObject) {
			// jsonObject allready has correct structure, so just pass it 
			self.setNearbyUsers(jsonObject);
		});

	};
	

	self.add(mapview);
	
	
	// PRIVATE FUNCTION
	var onFocus = function (source, type) {
		Ti.API.info('MapView.onFocus()');
		
		self.updateIntervalId = setInterval(function() {
			self.updateNearbyUsers();
		}, self.NEARBY_INTERVAL_MS);

	};
	self.addEventListener('focus', onFocus);
	
	// PRIVATE FUNCTION
	var onBlur = function (source, type) {
		Ti.API.info('MapView.onBlur()');
		
		clearInterval(self.updateIntervalId);
	};
	self.addEventListener('blur', onBlur);
	
	
	return self;
	
};

module.exports = MapView;