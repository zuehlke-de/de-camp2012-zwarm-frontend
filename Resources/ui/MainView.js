function MainView() {
	
	var self = Ti.UI.createTabGroup({
		backgroundColor:'#ffffff'
	});
	
	var mapTab = Ti.UI.createTab({
		title: 'Map'
	});
	var newSwarmTab = Ti.UI.createTab({
		title: 'New Zwarm'
	});
	var allSwarmsTab = Ti.UI.createTab({
		title: 'All Swarms'
	});
	
	
	self.addTab(mapTab);
	self.addTab(newSwarmTab);
	self.addTab(allSwarmsTab);
	
	self.navigateTo = function (view) {
		self.getActiveTab().window = view;
	}
	
	return self;
	
};

module.exports = MainView;