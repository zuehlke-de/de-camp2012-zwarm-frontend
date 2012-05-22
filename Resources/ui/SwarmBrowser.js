function SwarmBrowser(){
		//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	var table = Titanium.UI.createTableView();
	
	self.add(table);
	
	var SampleView = require('/ui/SampleView');
	var sampleView = new SampleView();

	self.addEventListener('click', function(e){
		alert('You clicked row '+e.index);
		
		self.containingTab.open(sampleView);
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