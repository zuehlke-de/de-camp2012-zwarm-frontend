function SwarmDefinitionView() {
	
		//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
	
	var rows = [];
	var tableCellWidth = '90%';
	var gapLeft = '5%';
	
	var scrollview = Ti.UI.createScrollableView({height:'100%'});
 
	var nameTextField = Ti.UI.createTextField({title:"Name", hintText:'Name', width: tableCellWidth});
	var row = Ti.UI.createTableViewRow()
	row.add(nameTextField);
	rows.push(row);
	
	var taskTextField = Ti.UI.createTextField({title:"Task", hintText:'Task', width:tableCellWidth});
	var row = Ti.UI.createTableViewRow();
	row.add(taskTextField);
	rows.push(row);
	
	var dateNow = new Date();
	
	var datePickedHandler = function(date){
		validFromLabel.text="From: " + date;
	}
	
	var validFromLabel = Ti.UI.createLabel({text:"From: " + dateNow, width:tableCellWidth, left:gapLeft, hasChild:true});
	validFromLabel.addEventListener('click',function(e){
		
		var DatePicker = require('ui/DatePickerView');
		var my_datePicker = new DatePicker(dateNow, datePickedHandler);
		my_datePicker.open();
		
	});
	row = Ti.UI.createTableViewRow({hasChild:true});
	row.add(validFromLabel);
	rows.push(row);
	
	rows.push(Titanium.UI.createTableViewRow({title:"Until: 18.03.2012 20:00", width:tableCellWidth,left:gapLeft,  hasChild:true}));
	rows.push(Titanium.UI.createTableViewRow({title:"Wait: 3:00 Minutes", width:tableCellWidth, left:gapLeft, hasChild:true}));
	
	var sliderLabel = Ti.UI.createLabel({text:"Duration: 60 Seconds",width:'45%', left:gapLeft })
	var slider = Ti.UI.createSlider({min:0, max: 300, value:60, width:'45%',left:'50%'});
	row = Ti.UI.createTableViewRow();
	row.add(sliderLabel);
	row.add(slider);
	rows.push(row);
	
	rows.push(Titanium.UI.createTableViewRow({title:"Location: None", width:tableCellWidth, left:gapLeft, hasChild:false}));
	rows.push(Titanium.UI.createTableViewRow({title:"Within: 300m", width:tableCellWidth, left:gapLeft, hasChild:true}));
	rows.push(Titanium.UI.createTableViewRow({title:"Min. participants: 30", width:tableCellWidth, left:gapLeft, hasChild:true}));
	rows.push(Titanium.UI.createTableViewRow({title:"Max. participants: 60", width:tableCellWidth, left:gapLeft, hasChild:true}));
	
	var publishButton = Ti.UI.createButton({
									title:'Publish',
									width:tableCellWidth});
									
	publishButton.addEventListener('click',function(e){
									var sendObject = {};
									if(nameTextField.value.length>0 && taskTextField.value.length>0){
										sendObject.active = true;
										sendObject.title = nameTextField.value;
										sendObject.task = taskTextField.value;
										sendObject.validFrom = "19.02.2012 10:00";
										sendObject.validUntil = "18.03.2012 20:00";
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