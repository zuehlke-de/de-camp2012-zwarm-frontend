function DatePickerView(changeHandler) {
	
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	var picker = Ti.UI.createPicker({
	    type:Ti.UI.PICKER_TYPE_DATE,
	    minDate: new Date(),
	    maxDate: new Date(2020, 12, 31),
	    value: new Date(2012, 5, 22)
	});
	
	picker.addEventListener('change', function(e) {
  		changeHandler(e.value);
  		self.close();
	});
	
	self.add(picker);
	
	return self;
	
};

module.exports = DatePickerView;



