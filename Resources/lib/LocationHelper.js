var LocationHelper = function() {
	var instance = null;
	
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight, 
		width = Ti.Platform.displayCaps.platformWidth;


	var self = {
		isIOS: (osname === 'iphone') || (osname === 'ipad'),
		isAndroid: (osname === 'android'),
		minUpdateTime: 1000,
		updateReceived: false
	};

	// PRIVATE FUNCTION
	self.onLocationChanged = function (e) {
		if(!e.success || e.error) {
			Ti.API.info('error:' + JSON.stringify(e.error));
		} else {
			Ti.API.info('coords: ' + JSON.stringify(e.coords));
			Ti.App.fireEvent('zwarm.location.updated', e.coords);
			self.updateReceived = true;
		}
	};

	// PUBLIC FUNCTION
	/**
	 * start listening for continuous location updates
	 */
	self.start = function() {

		if(self.isIOS) {
			// iOS
			if(Ti.Geolocation.locationServicesEnabled) {
				Ti.Geolocation.purpose = 'This app requires location information.';
				Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
				Ti.Geolocation.frequency = self.minUpdateTime;
				Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;

				Ti.Geolocation.addEventListener('location', self.onLocationChanged);
			} else {
				alert('Please enable location services');
			}

		} else if(self.isAndroid) {
			// ANDROID
			if(Ti.Geolocation.locationServicesEnabled) {
				
				var providerGps = Ti.Geolocation.Android.createLocationProvider({
					name : Ti.Geolocation.PROVIDER_GPS,
					minUpdateDistance : 0.0,
					minUpdateTime : self.minUpdateTime
				});
				Ti.Geolocation.Android.addLocationProvider(providerGps);
				Ti.Geolocation.Android.manualMode = true;

				Ti.Geolocation.addEventListener('location', self.onLocationChanged);

			} else {
				alert('Please enable location services');
			}
		}
	};
	
	/**
	 * Stop listening for continuous location updates
	 */
	self.stop = function () {
		// TODO unregister listeners etc
		if(self.updateReceived) {
			Ti.Geolocation.removeEventListener('location', self.onLocationChanged);
		}
	}
	
	return self;
}

module.exports = LocationHelper;
