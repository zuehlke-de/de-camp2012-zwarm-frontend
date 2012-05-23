function SwarmListView(swarmDefinition){

	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	var table = Titanium.UI.createTableView({
		headerTitle: swarmDefinition.title + " (" + swarmDefinition.swarmCount + ")"
	});
	
	self.add(table);
	
	var SwarmCommentsView = require('/ui/SwarmCommentsView');

	self.addEventListener('click', function(e){
		var swarmCommentsView = new SwarmCommentsView(e.rowData);
		swarmCommentsView.containingTab = self.containingTab;
		self.containingTab.open(swarmCommentsView);
	});
	
	var SwarmClient = require('/network/SwarmClient');
	var swarmClient = new SwarmClient();
	
	var onLoadCallback = function(json) {
		alert('Swarm result: ' + JSON.stringify(json));
		var swarmArray = json.swarms;
		for (item in swarmArray) {
			item.title = item.city + ' ' + new Date(item.invitationTime);
		}
		table.data = swarmArray;
	}
	swarmClient.getSwarmsForSwarmDefinition(swarmDefinition.id, onLoadCallback);
	
	return self;
}

module.exports = SwarmListView;