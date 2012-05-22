function DatePickerView(parentView) {
	
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	var picker = Ti.UI.createPicker({
	    type:Ti.UI.PICKER_TYPE_DATE,
	    minDate:new Date(2009,0,1),
	    maxDate:new Date(2014,11,31),
	    value:new Date(2014,3,12)
	});
	
	picker.addEventListener('change',function(e) {
  		// Ti.API.info("User selected date: " + e.value.toLocaleString());
  		parentView.setDate(e.value);
  		self.close();
	});
	
	self.add(picker);
	
	return self;
	
};

module.exports = DatePickerView;



