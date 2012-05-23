function RestClient(){
	var baseUrl = 'http://ec2-54-247-155-88.eu-west-1.compute.amazonaws.com:4711'
		requestTimeoutMillis = 60000; 
	
	return {
		get: function (path, parserCallback) {
			var xhr = Ti.Network.createHTTPClient({
				onload: function(e) {
					var jsonObject;
					Ti.API.debug(this.responseText);
					try {
						jsonObject = JSON.parse(this.responseText);
					} catch (e) {
						jsonObject = {};
					}
					parserCallback(jsonObject);
				},
				onerror: function(e) {
					Ti.API.debug(e.error);
					alert('Error(' + this.status +'): ' + e.error);
				},
				timeout: requestTimeoutMillis
			});
			xhr.open('GET', baseUrl + path);
			xhr.send();
		},
		
		post: function (path, jsonData, parserCallback) {
			var xhr = Ti.Network.createHTTPClient({
				onload: function(e) {
					var jsonObject;
					Ti.API.debug(this.responseText);
					try {
						jsonObject = JSON.parse(this.responseText);
					} catch (e) {
						jsonObject = {};
					}
					parserCallback && parserCallback(jsonObject);
				},
				onerror: function(e) {
					Ti.API.debug(e.error);
					alert('Error(' + this.status +'): ' + e.error + '; ' + this.responseText);
				},
				timeout: requestTimeoutMillis
			});
			xhr.open('POST', baseUrl + path);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(jsonData));
		},
		
		put: function (path, jsonData, parserCallback) {
			var xhr = Ti.Network.createHTTPClient({
				onload: function(e) {
					var jsonObject;
					Ti.API.debug(this.responseText);
					try {
						jsonObject = JSON.parse(this.responseText);
					} catch (e) {
						jsonObject = {};
					}
					parserCallback && parserCallback(jsonObject);
				},
				onerror: function(e) {
					Ti.API.debug(e.error);
					alert('Error(' + this.status +'): ' + e.error);
				},
				timeout: requestTimeoutMillis
			});
			xhr.open('PUT', baseUrl + path);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(jsonData));
		}
	};
};
module.exports = RestClient;