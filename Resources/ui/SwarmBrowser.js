function SwarmBrowser(){
		//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	var table = Titanium.UI.createTableView();
	
	self.add(table);
	
	var SwarmListView = require('/ui/SwarmListView');
	
	self.openSwarmDefinitionView = function(swarmDef) {
		var swarmListView = new SwarmListView(swarmDef);
		swarmListView.containingTab = self.containingTab;
		self.containingTab.open(swarmListView);
		return swarmListView;
	}
	
	self.addEventListener('click', function(e){
		self.openSwarmDefinitionView(e.rowData);
	});
	
	var SwarmClient = require('/network/SwarmClient');
	var swarmClient = new SwarmClient();
	
	var onLoadCallback = function(json) {
		table.data = json.swarmDefinitions;
	}
	swarmClient.getSwarmDefinitions(onLoadCallback);
	
	self.openPastSwarmView = function(swarmId) {
		swarmClient.getSwarmById(swarmId, function(swarm) {
			swarmClient.getSwarmDefintionById(swarm.swarmDefinitionId, function(swarmDef) {
				var view = self.openSwarmDefinitionView(swarmDef);
				view.openPastSwarmView(swarm);
			});
		});
	}
	
	return self;
}
module.exports = SwarmBrowser;