function DatePickerView(callback) {
	
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		layout: 'vertical'
	});
	
	var date = new Date();
	var time = new Date();
		
	var datePicker = Ti.UI.createPicker({
	    type:Ti.UI.PICKER_TYPE_DATE,
	    minDate: new Date(),
	    maxDate: new Date(2020, 12, 31),
	    value: new Date(2012, 5, 22),
	    top: '20'
	});
	datePicker.addEventListener('change', function(e) {
  		date = e.value;
	});
	
	var timePicker = Ti.UI.createPicker({
	    type:Ti.UI.PICKER_TYPE_TIME,
	    minDate: new Date(),
	    maxDate: new Date(2020, 12, 31),
	    value: new Date(),
	    top: '20'
	});
	timePicker.addEventListener('change', function(e) {
  		time = e.value;
	});
	
	var buttonContainer = Ti.UI.createView({
		layout: 'horizontal',
		top: '50',
	});
	
	var okButton = Ti.UI.createButton({
		title: "OK",
		width: '35%',
		left: '10%'
	});
	okButton.addEventListener('click', function() {
		callback(date, time);
		self.close();
	});
	
	var cancelButton = Ti.UI.createButton({
		title: "Cancel",
		width: '35%',
		left: '10%'
	});
	cancelButton.addEventListener('click', function() {
		self.close();
	});
	
	buttonContainer.add(okButton);
	buttonContainer.add(cancelButton);
	
	
	self.add(datePicker);
	self.add(timePicker);
	self.add(buttonContainer);
	
	return self;
	
};

module.exports = DatePickerView;



