function SwarmCommentsView(swarm){

	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	var table = Titanium.UI.createTableView({
		headerTitle: swarm.city + ", " + swarm.invitationDate + "(" + swarm.commentCount + ")"
	});
	
	self.add(table);
	
	var SwarmClient = require('/network/SwarmClient');
	var swarmClient = new SwarmClient();
	
	var onLoadCallback = function(json) {
		table.data = json;
	}
	swarmClient.getAllCommentsForSwarm(swarm.id, onLoadCallback);
	
	return self;
}

module.exports = SwarmCommentsView;