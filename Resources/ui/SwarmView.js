Titanium.include('/util/Countdown.js');

var buttonWidth = '80%';
var buttonHeight = '10%';
var textWidth = buttonWidth;

function toDurationString(duration) {
	var durationString = '';
	if(duration == 1){
		durationString = '1 Second';
	} else if(duration == 60){
		durationString = '1 Minute';
	} else if(duration > 59 && duration%60 == 0){
		durationString = duration/60 + ' Minutes';
	} else {
		durationString = duration + ' Seconds';
	}
	return durationString;
}

function SwarmView(swarm) {
	Ti.API.debug('SwarmView: '+JSON.stringify(swarm));
	var self = Titanium.UI.createWindow({ 
	    title: 'SwarmWindow',
	    backgroundColor: '#fff',
	    layout: 'vertical'
	});
	
	var userSelection = false;
	
	var SwarmClient = require('/network/SwarmClient');
	var swarmClient = new SwarmClient();
	
	swarmClient.getSwarmDefintionById(swarm.swarmDefinitionId, function(swarmDefinition) {
		Ti.API.debug('SwarmView SwarmDefinition: '+swarmDefinition);
		var durationString = toDurationString(swarmDefinition.duration);
		
		var swarmLabel = Titanium.UI.createLabel({
			backgroundColor: 'yellow',
			color: 'black',
			top: '10%',
			width: textWidth,
			text: 'Swarm: "' + swarmDefinition.title + '" '+ swarmDefinition.task + ' (' + durationString + ')',
			font: {fontSize: 30, fontFamily: 'Helvetica Neue'},
			textAlign: 'center'
		});
		self.add(swarmLabel);
		
		//label for the countdown
		var countdownLabel = Ti.UI.createLabel({
			top:'5%',
			width: textWidth,
			text: ''
		});
		self.add(countdownLabel);
		// timer for Starting in ...
		var my_timer = new CountDown(0, swarmDefinition.waitingTime,
			function() {
		    	countdownLabel.text = "Starting in " + my_timer.toString() + " Minutes.";
			},
		    function() {
		    	if(userSelection){
		    		startZwarm();
		    	} else {
		    		self.close();
		    	}
		   }
		).start();
		countdownLabel.text = "Starting in " + my_timer.toString() + " Minutes.";
		var startZwarm = function(){
			var my_timer = new CountDown(0, zwarmDuration,
				function(){
			    	countdownLabel.text = "Finishing in " + my_timer.toString() + " Minutes.";
				},
				function(){
					// TODO goto Photo List View
				}
			).start();
			swarmLabel.backgroundColor='green';
			countdownLabel.text = "Finishing in " + my_timer.toString() + " Minutes.";
		}
		
		self.buttonParticipate = Titanium.UI.createButton({
		   title: 'Participate',
		   top:'5%',
		   width: buttonWidth,
		   height: buttonHeight
		});
		self.buttonParticipate.addEventListener('click', function(e){
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
			self.close();
		});
		self.add(self.buttonNotParticipate);
		
		var AddCommentView = require("AddCommentView");
		self.addCommentView = new AddCommentView();
		// TODO use correct swarm id
		self.addCommentView.swarmId = '7777777';
		self.addCommentView.visible = false;
		self.addCommentView.top = '5%';
		self.addCommentView.left = '3%';
		self.add(self.addCommentView);
	});
	
	return self;
}

module.exports = SwarmView;