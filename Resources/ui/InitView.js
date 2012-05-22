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
		var userId = Ti.Platform.createUUID();
		Ti.App.Properties.setString('user.id', userId);
		var userName = nicknameInput.value.trim();
		if (userName.length == 0) {
			userName = nicknameInput.hintText;
		}
		Ti.App.Properties.setString('user.name', userName);
	    // TODO call server		
		self.close();
	});
	containerView.add(initButton);
	
	return self;
};

module.exports = InitView;