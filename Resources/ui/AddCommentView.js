function AddCommentView() {
 
	var self = Ti.UI.createView({
		//width: '90%',
		//height: '95%',
		layout: 'vertical'
	});
	 
	var photoArea = Ti.UI.createView({
		layout: 'horizontal',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
	});
	 
	var picture = Titanium.UI.createImageView({
	   image:"/picture-icon.png",
	});
	picture.addEventListener('click', function(e) {
		Titanium.Media.showCamera({
			success: function(mediaContent) {
				picture.image = mediaContent.media;
			},
		});
	});
	photoArea.add(picture);
	
	var commentField = Ti.UI.createTextArea({
		color: '#000000',
		// backgroundColor: '#333377',
		width: '68%',
		height: 200,
		left: '2%',
		hintText: "Please write a comment...",
	});
	photoArea.add(commentField);
	 
	self.add(photoArea);
	 
	// Buttons for Send
	var sendButton = Ti.UI.createButton({
		color: '#000000',
		// backgroundColor:'#526F35',
		top: '5%',
		width: Ti.UI.FILL,
		title: "Send",
	})
	self.add(sendButton);
	 
	//Add behavior for UI
	sendButton.addEventListener('click', function(e) { 
		var SwarmClient = require('/network/SwarmClient');
		var swarmClient = new SwarmClient();
		var comment = {
			text: commentField.value,
			userNickname: Ti.App.Properties.getString('user.name'),
		};
		swarmClient.addCommentToSwarm(comment, self.swarmId);
		// TODO open photo list view		
	});
 
	return self;
}

module.exports = AddCommentView;