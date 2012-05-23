function InitView() {
	
	// create object instance
	var self = Ti.UI.createWindow({
		title:'Login',
	    width: '100%',
	    height: '100%',
		backgroundColor:'#ffffff',
	});
		
	var containerView = Ti.UI.createView({
		backgroundColor: 'transparent',
		width: '90%',
		height: '90%',
		top: '5%',
		left: '5%',
		layout: 'vertical'
	});
	self.add(containerView);
	
	var logoImage = Titanium.UI.createImageView({
	  image:'/zwarm-logo.png',
	  top: '7%'
	});
	containerView.add(logoImage);
	
	var nicknameLabel = Titanium.UI.createLabel({
		color:'#000000',
		text:'Please enter a nickname',
		font:{fontSize:30, fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		top: '7%'
	});
	containerView.add(nicknameLabel);
	
	var nicknameInput = Ti.UI.createTextField({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		top: '7%',
		hintText: 'anonymous'
	});
	containerView.add(nicknameInput);
	
	var initButton = Ti.UI.createButton({
		title: 'Go!',
		width: Ti.UI.FILL,
		top: '7%',
	});
	initButton.addEventListener('click', function(event) {
		var user = {
			id: Ti.Platform.createUUID(), 
			nickname: getNickname(),
			platform: getPlatform(),
			notificationToken: getNotificationToken(),
		}
		
	    // call server		
		var SwarmClient = require('/network/SwarmClient');
		var swarmClient = new SwarmClient();
		swarmClient.addUser(user, function(userJSON) {
			// set properties
			Ti.App.Properties.setString('user.id', userJSON.id);
			Ti.App.Properties.setString('user.name', userJSON.name);
			self.close();
		});
		
	});
	containerView.add(initButton);
	
	var getNickname = function() {
		var nickname = nicknameInput.value.trim();
		if (nickname.length == 0) {
			nickname = nicknameInput.hintText;
		}
		return nickname;
	}
	var getPlatform = function() {
		var platform = 'unknown';
		
		var osname = Ti.Platform.osname;
		if ((osname === 'iphone') || (osname === 'ipad')) {
			platform = 'ios';
		} else if (osname === 'android') {
			platform = 'android';
		}
		
		return platform;
	}
	var getNotificationToken = function() {
		var notificationToken = '';
		if (Ti.App.Properties.hasProperty('user.notificationToken')) {
			notificationToken = Ti.App.Properties.getString('user.notificationToken');
		}		
		return notificationToken;
	}
	
	return self;
};

module.exports = InitView;