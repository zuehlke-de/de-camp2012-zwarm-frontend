function MainView() {
	
	var self = Ti.UI.createTabGroup({
		backgroundColor:'#ffffff'
	});
	
	var MapView = require('/ui/MapView');
	var mapView = new MapView();
	var mapTab = Ti.UI.createTab({
		title: 'Map',
		window: mapView
	});
	mapView.containingTab = mapTab;
	
	var SwarmDefinitionView = require('/ui/SwarmDefinitionView');
	var swarmDefinitionView = new SwarmDefinitionView();
	var newSwarmTab = Ti.UI.createTab({
		title: 'New Zwarm',
		window: swarmDefinitionView
	});
	swarmDefinitionView.containingTab = newSwarmTab;
	
	var SwarmBrowser = require('/ui/SwarmBrowser');
	var swarmBrowser = new SwarmBrowser();
	var allSwarmsTab = Ti.UI.createTab({
		title: 'All Zwarms',
		window: swarmBrowser
	});
	swarmBrowser.containingTab = allSwarmsTab;
	
	
	self.addTab(mapTab);
	self.addTab(newSwarmTab);
	self.addTab(allSwarmsTab);
	
	return self;
	
};

module.exports = MainView;