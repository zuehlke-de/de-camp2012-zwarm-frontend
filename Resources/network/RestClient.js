function RestClient(){
	var baseUrl = 'http://ec2-54-247-155-88.eu-west-1.compute.amazonaws.com:4711'; 
	var timeout = 10000;
	
	var createHttpClient = function() {
		return Ti.Network.createHTTPClient({
			onload: function(e) {
				var jsonObject;
				Ti.API.debug('Response text: ' + this.responseText);
				jsonObject = JSON.parse(this.responseText);
				parserCallback && parserCallback(jsonObject);
			},
			onerror: function(e) {
				Ti.API.debug('Response text: ' + this.responseText);
				alert('Error(' + this.status +'): ' + e.error + '; ' + this.responseText);
			},
			timeout: timeout
		});
	}
	
	return {
		get: function (path, parserCallback) {
			var httpClient = createHttpClient();
			httpClient.open('GET', baseUrl + path);
			httpClient.send();
		},
		
		post: function (path, jsonData, parserCallback) {
			var httpClient = createHttpClient();
			httpClient.open('POST', baseUrl + path);
			httpClient.setRequestHeader('Content-Type', 'application/json');
			httpClient.send(JSON.stringify(jsonData));
		},
		
		put: function (path, jsonData, parserCallback) {
			var httpClient = createHttpClient();
			httpClient.open('PUT', baseUrl + path);
			httpClient.setRequestHeader('Content-Type', 'application/json');
			httpClient.send(JSON.stringify(jsonData));
		}
	};
};
module.exports = RestClient;
