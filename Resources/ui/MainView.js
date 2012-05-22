function MainView() {
	
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
	
	var MapView = require('MapView');
	var SwarmDefinitionView = require('SwarmDefinitionView');
	var SampleView = require('SampleView');

	
	

	self.add(buttonBar)
	self.add(container);
	
	return self;
	
};

module.exports = MainView;