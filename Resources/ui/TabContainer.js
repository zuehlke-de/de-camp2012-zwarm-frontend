function MainView() {
	
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
	
	
	
	var MapView = require('MapView');
	var SwarmDefinitionView = require('SwarmDefinitionView');
	var SampleView = require('SampleView');

	var mapTab = Ti.UI.createTab({
		title: 'Map',
		window: new MapView()
	});
	
	var newSwarmTab = Ti.UI.createTab({
		title: 'New Zwarm',
		window: new SwarmDefinitionView()
	});
	
	var allSwarmsTab = Ti.UI.createTab({
		title: 'All Zwarms',
		window: new SampleView()
	});
	
	self.addTab(mapTab);
	self.addTab(newSwarmTab);
	self.addTab(allSwarmsTab);
	
	return self;
	
};

module.exports = MainView;