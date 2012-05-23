var Cloud = require('ti.cloud');
Cloud.debug = true;  // optional; if you add this line, set it to false for production

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var LocationHelper = require('lib/LocationHelper');
var locationHelper = new LocationHelper();

var PushNotificationService = require('network/android/PushNotificationService');
var pushNotificationService = new PushNotificationService(function(evt) {
	// evt.payload should be a swarmId
	// TODO get additional swarm data and open the SwarmView instead
	Ti.API.info('PushNotification received: ' + evt.payload);
});


var openInitView = function() {
	var InitView = require('ui/InitView');
	var view = new InitView();
	view.addEventListener('close', function(event) {
		openMainView();
	});
	view.open();
}
var openMainView = function() {
	Ti.API.debug(Ti.App.Properties.getString('user.id') + " " + Ti.App.Properties.getString('user.name'));
	var MainView = require('ui/MainView');
	var view = new MainView();
	view.open();
	
	// enable continuous location updates
	locationHelper.start();
}

//determine platform and form factor and render approproate components
var osname = Ti.Platform.osname,
	version = Ti.Platform.version,
	height = Ti.Platform.displayCaps.platformHeight,
	width = Ti.Platform.displayCaps.platformWidth;

if (osname === 'ios') {
	var PushNotificationService = require('/network/ios/PushNotificationService');
	new PushNotificationService();
}

// register for location changes
Ti.App.addEventListener('zwarm.location.updated', function(coords) {
	var SwarmClient = require('network/SwarmClient'),
		swarmClient = new SwarmClient(),
		userId = Ti.App.Properties.getString('user.id');
	if (userId) {
		swarmClient.updateUserLocation(userId, {
			timestamp : coords.timestamp,
			latitude : coords.latitude,
			longitude : coords.longitude
		});
	}
});

if (!Ti.App.Properties.hasProperty('user.id')) {
	openInitView();
} else {
	openMainView();
}
