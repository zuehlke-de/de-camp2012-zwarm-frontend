function SwarmClient(){
	var RestClient = require('/network/RestClient');
	var restClient = new RestClient();

	return {
		getSwarmDefinitions: function(onLoadCallback) {
			var parserCallback = function(jsonObject) {
				onLoadCallback(jsonObject);
			} 
			restClient.get('/swarms', parserCallback);
		}
	};
}

module.exports = SwarmClient;
