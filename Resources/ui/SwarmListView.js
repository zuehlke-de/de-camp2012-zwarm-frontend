function SwarmListView(swarmDefinition){

	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	var table = Titanium.UI.createTableView({
		headerTitle: swarmDefinition.title + " (" + swarmDefinition.swarmCount + ")"
	});
	
	self.add(table);
	
	var SwarmCommentsView = require('/ui/SwarmCommentsView');
	var swarmCommentsView = new SwarmCommentsView();

	self.addEventListener('click', function(e){
		var swarmCommentsView = new SwarmCommentsView(e.rowData);
		swarmCommentsView.containingTab = self.containingTab;
		self.containingTab.open(swarmCommentsView);
	});
	
	var SwarmClient = require('/network/SwarmClient');
	var swarmClient = new SwarmClient();
	
	var onLoadCallback = function(json) {
		table.data = json;
	}
	swarmClient.getSwarmsForSwarmDefinition(swarmDefinition.id, onLoadCallback);
	
	return self;
}

module.exports = SwarmListView;