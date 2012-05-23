function SwarmDefinitionView() {
	
		//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
	
	var rows = [];
	var tableCellWidth = '90%';
	var gapLeft = '5%';
	var displayDateFormat = "dd.mm.yy hh:MM TT";
	
	var scrollview = Ti.UI.createScrollableView({height:'100%'});

	// Title:	
 
	var nameTextField = Ti.UI.createTextField({title:"Name", hintText:'Name', width: tableCellWidth});
	var row = Ti.UI.createTableViewRow()
	row.add(nameTextField);
	rows.push(row);

	// Task:	
	
	var taskTextField = Ti.UI.createTextField({title:"Task", hintText:'Task', width:tableCellWidth});
	var row = Ti.UI.createTableViewRow();
	row.add(taskTextField);
	rows.push(row);
	
	
	Titanium.include('/util/DateFormat.js');
	var DatePicker = require('ui/DatePickerView');
		

	// DateFrom:	
	
	var dateFrom = new Date();
	
	var datePickedHandler = function(date){
		dateFrom = date;
		validFromLabel.text="From: " + date.format(displayDateFormat);
	}
	
	var validFromLabel = Ti.UI.createLabel({text:"From: " + dateFrom.format(displayDateFormat), width:tableCellWidth, left:gapLeft, hasChild:true});
	validFromLabel.addEventListener('click',function(e){
		
		var my_datePickerFrom = new DatePicker(dateFrom, datePickedHandler);
		my_datePickerFrom.open();
		
	});
	row = Ti.UI.createTableViewRow({hasChild:true});
	row.add(validFromLabel);
	rows.push(row);
	
	//DateUntil:	
	
	var dateUntil = new Date();
	
	var datePickedHandlerUntil = function(date){
		dateUntil = date;
		validUntilLabel.text="Until: " + date.format(displayDateFormat);
	}
	
	var validUntilLabel = Ti.UI.createLabel({text:"Until: " + dateUntil.format(displayDateFormat), width:tableCellWidth, left:gapLeft, hasChild:true});
	validUntilLabel.addEventListener('click',function(e){
		
		var my_datePickerUntil = new DatePicker(dateUntil, datePickedHandlerUntil);
		my_datePickerUntil.open();
		
	});
	row = Ti.UI.createTableViewRow({hasChild:true});
	row.add(validUntilLabel);
	rows.push(row);
	
	// Waiting Time:	
	
	var waitingTimeLabel = Ti.UI.createLabel({text:"Wait: 3:00 Minutes", width:tableCellWidth, left:gapLeft});
	row = Ti.UI.createTableViewRow({hasChild:true});
	row.add(waitingTimeLabel);
	rows.push(row);
	
	// Duration Slider:
	
	var sliderLabel = Ti.UI.createLabel({text:"Duration: 60 Seconds",width:'45%', left:gapLeft })
	var slider = Ti.UI.createSlider({min:0, max: 300, value:60, width:'45%',left:'50%'});
	row = Ti.UI.createTableViewRow();
	row.add(sliderLabel);
	row.add(slider);
	rows.push(row);
	
	// Location:
	var waitingTimeLabel = Ti.UI.createLabel({text:"Location: None", width:tableCellWidth, left:gapLeft});
	row = Ti.UI.createTableViewRow({hasChild:false});
	row.add(waitingTimeLabel);
	rows.push(row);
	


	
	// Radius:	
	
	var waitingTimeLabel = Ti.UI.createLabel({text:"Within: 300m", width:tableCellWidth, left:gapLeft});
	row = Ti.UI.createTableViewRow({hasChild:true});
	row.add(waitingTimeLabel);
	rows.push(row);
	
	// Min Participants:	
	
	var waitingTimeLabel = Ti.UI.createLabel({text:"Min. participants: 30", width:tableCellWidth, left:gapLeft});
	row = Ti.UI.createTableViewRow({hasChild:true});
	row.add(waitingTimeLabel);
	rows.push(row);
	
	// Max participants:	
	
	var waitingTimeLabel = Ti.UI.createLabel({text:"Max. participants: 60", width:tableCellWidth, left:gapLeft});
	row = Ti.UI.createTableViewRow({hasChild:true});
	row.add(waitingTimeLabel);
	rows.push(row);
	
	
	var publishButton = Ti.UI.createButton({
									title:'Publish',
									width:tableCellWidth});
									
	publishButton.addEventListener('click',function(e){
									var sendObject = {};
									if(nameTextField.value.length>0 && taskTextField.value.length>0){
										sendObject.active = true;
										sendObject.title = nameTextField.value;
										sendObject.task = taskTextField.value;
										sendObject.validFrom = dateFrom.getTime();
										sendObject.validUntil = dateUntil.getTime();
										sendObject.waitingTime = 180;
										sendObject.duration = 60;
										sendObject.minParticipants = 30;
										sendObject.maxParticipants = 60;
										sendObject.radius = 300;

										var SwarmClient = require('network/SwarmClient');
										var my_swarmClient = new SwarmClient();
										
										my_swarmClient.addSwarmDefinition(sendObject,function(){
											alert('Saved');
										});
										
									} else {
										alert('Please enter all relevant data.');
									}
								});						
						
	row = Ti.UI.createTableViewRow();
	row.add(publishButton);
	rows.push(row);
	
	var tableView = Ti.UI.createTableView({
		style:Ti.UI.iPhone.TableViewStyle.GROUPED,
		width:'100%',
		top:'10%',
		data: rows
	});

	scrollview.add(tableView);
	self.add(scrollview);
	
	return self;
	
};

module.exports = SwarmDefinitionView;