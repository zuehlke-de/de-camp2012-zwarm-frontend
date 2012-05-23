// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

function SwarmView() {
	//
	// create base UI tab and root window
	//
	var self = Titanium.UI.createWindow({ 
	    title: 'SwarmWindow',
	    backgroundColor: '#fff',
	    layout: 'vertical'
	});
	
	var userSelection = false;
	
	var swarmDefinition = {};
	
	swarmDefinition.name = "Jump around";
	swarmDefinition.description = "Raise your Arms in the air and jump around as if you just don't care.";
	swarmDefinition.countdownSeconds = 60;
	swarmDefinition.durationSeconds = 15;
	
	var countdownSeconds = swarmDefinition.countdownSeconds;      // Wait time in seconds
	var zwarmDuration = swarmDefinition.durationSeconds;
	
	var durationString;
	if(swarmDefinition.durationSeconds==1){
		durationString = '1 Second';
	} else if(swarmDefinition.durationSeconds==60){
		durationString = '1 Minute';
	} else if(swarmDefinition.durationSeconds>59 && swarmDefinition.durationSeconds%60==0){
		durationString = swarmDefinition.durationSeconds/60 + ' Minutes';
	} else {
		durationString = swarmDefinition.durationSeconds + ' Seconds';
	}
	
	
	var buttonWidth = '80%';
	
	var buttonHeight = '10%';
	
	var textWidth = buttonWidth;
	
	var swarmLabel = Titanium.UI.createLabel({
		backgroundColor:'yellow',
		color:'black',
		top:'10%',
		width:textWidth,
		text:'Swarm: "' + swarmDefinition.name + '" '+ swarmDefinition.description + ' (' + durationString + ')',
		font:{fontSize:30,fontFamily:'Helvetica Neue'},
		textAlign:'center'
	});
	self.add(swarmLabel);
	
	var switchLabelColor = function(color){
		swarmLabel.backgroundColor = color;
	};
	
	var closeView = function(){
		alert('Close view');
	}
	
	Titanium.include('/util/Countdown.js');
	//label for the countdown
	var countdownLabel = Ti.UI.createLabel({
		top:'5%',
		width: textWidth,
		text: "Starting in " + Math.floor(countdownSeconds/60)+":"+countdownSeconds%60 + " Minutes."
	});
	self.add(countdownLabel);
	// timer for Starting in ...
	var my_timer = new countDown(0,countdownSeconds,
		function() {
	    	countdownLabel.text = "Starting in " + timeString(my_timer) + " Minutes.";
		},
	    function() {
	    	if(userSelection){
	    		startZwarm();
	    	} else {
	    		closeView();
	    	}
	   }
	).start();
	var startZwarm = function(){
		swarmLabel.backgroundColor='green';
		countdownLabel.text = "Finishing in " + Math.floor(zwarmDuration/60)+":"+zwarmDuration%60 + " Minutes.";
		var my_timer = new countDown(0,zwarmDuration,
			function(){
		    	countdownLabel.text = "Finishing in " + timeString(my_timer) + " Minutes.";
			},
			function(){
				// TODO goto Photo List View
			}
		).start();
	}
	
	self.buttonParticipate = Titanium.UI.createButton({
	   title: 'Participate',
	   top:'5%',
	   width: buttonWidth,
	   height: buttonHeight
	});
	self.buttonParticipate.addEventListener('click', function(e){
		var SwarmClient = require('/network/SwarmClient');
		var swarmClient = new SwarmClient();
		var participant = {
			id: Ti.App.Properties.getString('user.id')
		};
		// TODO correct swarm id
		swarmClient.addParticipantToSwarm(participant, '7777777');
		
		userSelection = true;
		self.remove(self.buttonParticipate);
		self.remove(self.buttonNotParticipate);
		self.addCommentView.show();
	});
	self.add(self.buttonParticipate);
	
	self.buttonNotParticipate = Titanium.UI.createButton({
	   title: 'Nope',
	   top:'5%',
	   width: buttonWidth,
	   height: buttonHeight
	});
	self.buttonNotParticipate.addEventListener('click', function(e){
		closeView();
	});
	self.add(self.buttonNotParticipate);
	
	var AddCommentView = require("ui/AddCommentView");
	self.addCommentView = new AddCommentView();
	// TODO use correct swarm id
	self.addCommentView.swarmId = '7777777';
	self.addCommentView.visible = false;
	self.addCommentView.top = '5%';
	self.addCommentView.left = '3%';
	self.add(self.addCommentView);
	
	return self;
}

module.exports = SwarmView;