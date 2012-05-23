function PushNotificationService(){
	
	Cloud.Users.login({
	    login: 'zuehlke',
	    password: 'isterstmalegal'
	}, function (e) {
		
	    if (e.success) {
	        var user = e.users[0];
	    	Ti.API.info('Titanium user ' + user.id + ' logged in successfully.');
	        
	        Titanium.Network.registerForPushNotifications({
			    types:[
			        Titanium.Network.NOTIFICATION_TYPE_BADGE,
			        Titanium.Network.NOTIFICATION_TYPE_ALERT,
			        Titanium.Network.NOTIFICATION_TYPE_SOUND
			     ],
			    success: function (args) {
			        var deviceToken = args.deviceToken;
			        Ti.API.info('Push registration successful. Device token: ' + deviceToken);
			        Ti.App.Properties.setString('user.notificationToken', deviceToken);
			        
			        if (!Ti.App.Properties.hasProperty('user.isSubscribedForPushChannel')) {
				        // Subscribe to channel if necessary
				        Cloud.PushNotifications.subscribe({
						    channel: 'swarm',
						    device_token: deviceToken
						}, function (e) {
						    if (e.success) {
						        alert('Push subscription successful.');
						        Ti.App.Properties.setBoolean('user.isSubscribedForPushChannel')
						    } else {
						        alert('Push subscribe error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
						    }
						});
			        }
					
					
			    },//successCallback,
			    error: function () {
			        Ti.API.info('Could not register for push notifications.');
			        alert('Could not register for push notifications.');
			    },//errorCallback,
			    callback: function (e) {          // <- NOTE THE ADDED EVENT VAR (e)
			        Ti.API.info('Push notification received:\n' + e);
			    	alert('Push notification received:\n' + e);
			    }//messageCallback
			});
	            
	            
	    } else {
	    	Ti.API.error('Could not log in Titanium user.');
	    	alert('Could not log in Titanium user.');
	    }
	});
}
module.exports = PushNotificationService;


