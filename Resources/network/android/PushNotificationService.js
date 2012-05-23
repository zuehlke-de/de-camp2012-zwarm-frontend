/**
 * Enables the PushNotifications
 * @param {Object} onPushNotificationReceived callback when pushNotification is received
 */
function PushNotificationService(onPushNotificationReceived) {

	var CloudPush = require('ti.cloudpush');
	var Cloud = require('ti.cloud');
	

	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['Yes', 'No'],
		message : 'Enable Push-Notifications?',
		title : 'Push-Notifications'
	});
	
	var pushEnabled = true;
	
	dialog.show();
	dialog.addEventListener('click', function(cancel, index, source, type) {
		pushEnabled = !cancel;
	});


	Cloud.Users.login({
		login : 'zuehlke',
		password : 'isterstmalegal'
	}, function(e) {

		if(e.success) {
			
			var user = e.users[0];
	    	Ti.API.info('Titanium user ' + user.id + ' logged in successfully.');
	    	

			var subscribe = function() {
				var deviceToken = Ti.App.Properties.getString('user.notificationToken');
				
				if(deviceToken !== null) {
					if(!Ti.App.Properties.hasProperty('user.isSubscribedForPushChannel')) {
					var channel = 'swarm';
					
					// unsubscribe
					Ti.API.info('Unsubscribing from channel: ' + channel);

					Cloud.PushNotifications.unsubscribe({
						channel : channel,
						device_token : deviceToken,
						type : 'android'
					}, function(e) {
						if(e.success) {
							Ti.API.info('Push unsubscription successful.');
						} else {
							Ti.API.info('Push unsubscription error: ' + ((e.error && e.message) || JSON.stringify(e)));
						}
					}); 

					
					Ti.API.info('Subscribing to channel: ' + channel);
					
					// Subscribe to channel if necessary
					Cloud.PushNotifications.subscribe({
						channel : channel,
						device_token : deviceToken,
						type : 'android'
					}, function(e) {
						if(e.success) {
							alert('Push subscription successful.');
							
							CloudPush.enabled = pushEnabled;
							Ti.App.Properties.setBool('user.isSubscribedForPushChannel', true);
						} else {
							alert('Push subscribe error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
							
						}
					});

					}
				}
			}
			
			if(!Ti.App.Properties.hasProperty('user.notificationToken')) {
				CloudPush.retrieveDeviceToken({
					success : function deviceTokenSuccess(e) {
						Ti.App.Properties.setString('user.notificationToken', e.deviceToken);
						Ti.API.info('Device Token: ' + e.deviceToken);
						subscribe();
					},
					error : function deviceTokenError(e) {
						alert('Failed to register for push! ' + e.error);
					}
				});
		    } else {
		    	// subscribe();
		    	Ti.API.info('Device_Token: ' + Ti.App.Properties.getString('user.notificationToken'));
		    }



			CloudPush.addEventListener('callback', function(evt) {
				alert(evt.payload);
			});
			CloudPush.addEventListener('trayClickLaunchedApp', function(evt) {
				Ti.API.info('Tray Click Launched App (app was not running)');
				onPushNotificationReceived(evt);
			});
			CloudPush.addEventListener('trayClickFocusedApp', function(evt) {
				Ti.API.info('Tray Click Focused App (app was already running)');
				onPushNotificationReceived(evt);
			});

			}

	}); 

};

module.exports = PushNotificationService;
