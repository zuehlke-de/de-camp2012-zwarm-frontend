function SwarmBrowser(){
		//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	var table = Titanium.UI.createTableView();
	
	self.add(table);
	
	var SwarmListView = require('/ui/SwarmListView');
	
	self.addEventListener('click', function(e){
		var swarmListView = new SwarmListView(e.rowData);
		swarmListView.containingTab = self.containingTab;
		self.containingTab.open(swarmListView);
	});
	
	var SwarmClient = require('/network/SwarmClient');
	var swarmClient = new SwarmClient();
	
	var onLoadCallback = function(json) {
		table.data = json;
	}
	swarmClient.getSwarmDefinitions(onLoadCallback);
	
	return self;
}
module.exports = SwarmBrowser;