function DatePickerView(callback) {
	
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
	
	var date = new Date();
	var time = new Date();
		
	var datePicker = Ti.UI.createPicker({
	    type:Ti.UI.PICKER_TYPE_DATE,
	    minDate: new Date(),
	    maxDate: new Date(2020, 12, 31),
	    value: new Date(2012, 5, 22)
	});
	
	var timePicker = Ti.UI.createPicker({
	    type:Ti.UI.PICKER_TYPE_TIME,
	    minDate: new Date(),
	    maxDate: new Date(2020, 12, 31),
	    value: new Date()
	});
	
	var okButton = Ti.UI.createButton({
		title: "OK"
	});
	okButton.addEventListener('click', function() {
		callback(date, time);
		self.close();
	});
	
	var cancelButton = Ti.UI.createButton({
		title: "Cancel"
	});
	cancelButton.addEventListener('click', function() {
		self.close();
	});
	
	datePicker.addEventListener('change', function(e) {
  		date = e.value;
	});
	timePicker.addEventListener('change', function(e) {
  		time = e.value;
	});
	
	self.add(datePicker);
	self.add(timePicker);
	self.add(okButton);
	self.add(cancelButton);
	
	return self;
	
};

module.exports = DatePickerView;



