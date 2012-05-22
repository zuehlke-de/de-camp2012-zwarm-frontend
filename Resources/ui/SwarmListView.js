function SwarmListView(swarmDefinition){

	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	var table = Titanium.UI.createTableView({
		headerTitle: swarmDefinition.title + " (" + swarmDefinition.swarmCount + ")"
	});
	
	self.add(table);
	
	var SampleView = require('/ui/SampleView');
	var sampleView = new SampleView();

	self.addEventListener('click', function(e){
		// alert('You clicked row '+e.index);
		
		self.containingTab.open(sampleView);
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