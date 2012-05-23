function SwarmClient(){
	var RestClient = require('/network/RestClient'),
		restClient = new RestClient();

	return {
		addUser: function (userJson, onLoadCallback) {
			var parserCallback = function (jsonObject) {
				onLoadCallback(jsonObject);
			}
			restClient.post('/users', userJson, parserCallback);
		},
		
		updateUserLocation: function (userId, locationJson) {
			var userJson = {
				id : userId,
				location : locationJson
			};
			restClient.put('/users/' + userId + '/location', userJson);
		},
		
		getNearbyUsersForUser: function (userId, onLoadCallback) {
			var parserCallback = function (jsonObject) {
				onLoadCallback(jsonObject);
			}
			restClient.get('/users/' + userId + '/nearbyUsers', parserCallback);
		},
		
		getSwarmDefinitions: function (onLoadCallback) {
			var parserCallback = function (jsonObject) {
				onLoadCallback(jsonObject);
			}
			restClient.get('/swarmdefinitions', parserCallback);
		},
		
		addSwarmDefinition: function (swarmDefJson, onLoadCallback) {
			var parserCallback = function (jsonObject) {
				onLoadCallback(jsonObject);
			}
			restClient.post('/swarmdefinitions', swarmDefJson, parserCallback);
		},
		
		getSwarmDefintionById: function (id, onLoadCallback) {
			var parserCallback = function (jsonObject) {
				onLoadCallback(jsonObject);
			} 
			restClient.get('/swarmdefinitions/' + id, parserCallback);
		},
		
		updateSwarmDefintion: function (id, swarmDefJson) {
			restClient.put('/swarmdefinitions/' + id, swarmDefJson);
		},
		
		getSwarmsForSwarmDefinition: function (id, onLoadCallback) {
			var parserCallback = function (jsonObject) {
				onLoadCallback(jsonObject);
			} 
			restClient.get('/swarmdefinitions/' + id + '/swarms', parserCallback);
		},
		
		getSwarmById: function (id, onLoadCallback) {
			var parserCallback = function (jsonObject) {
				onLoadCallback(jsonObject);
			} 
			restClient.get('/swarms/' + id, parserCallback);
		},
		
		addParticipantToSwarm: function (participantJson, swarmId) {
			restClient.post('/swarms/' + swarmId + '/participants', participantJson);
		},
		
		addCommentToSwarm: function (commentJson, swarmId) {
			restClient.post('/swarms/' + swarmId + '/comments', commentJson);
		},
		
		getAllCommentsForSwarm: function (id, onLoadCallback) {
			var parserCallback = function (jsonObject) {
				onLoadCallback(jsonObject);
			} 
			restClient.get('/swarms/' + id + '/comments', parserCallback);
		}
	};
}

module.exports = SwarmClient;
