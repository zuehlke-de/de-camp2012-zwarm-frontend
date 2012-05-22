function RestClient(){
	var baseUrl = 'http://google.com'; // TODO: Use real webservice URL
	
	return {
		get: function (path, parserCallback) {
			var xhr = Ti.Network.createHTTPClient({
				onload: function(e) {
					var jsonObject;
					Ti.API.debug(this.responseText);
					jsonObject = JSON.parse(this.responseText);
					parserCallback(jsonObject);
				},
				onerror: function(e) {
					Ti.API.debug(e.error);
					alert('Error!');
				},
				timeout:5000
			});
			xhr.open('GET', baseUrl + '?q=zuehlke');
			xhr.send();
		},
		
		post: function (path, jsonData, parserCallback) {
			var xhr = Ti.Network.createHTTPClient({
				onload: function(e) {
					var jsonObject;
					Ti.API.debug(this.responseText);
					jsonObject = JSON.parse(this.responseText);
					parserCallback && parserCallback(jsonObject);
				},
				onerror: function(e) {
					Ti.API.debug(e.error);
					alert('Error!');
				},
				timeout:5000
			});
			xhr.open('POST', baseUrl + path);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(jsonData);
		},
		
		put: function (path, jsonData, parserCallback) {
			var xhr = Ti.Network.createHTTPClient({
				onload: function(e) {
					var jsonObject;
					Ti.API.debug(this.responseText);
					jsonObject = JSON.parse(this.responseText);
					parserCallback && parserCallback(jsonObject);
				},
				onerror: function(e) {
					Ti.API.debug(e.error);
					alert('Error!');
				},
				timeout:5000
			});
			xhr.open('PUT', baseUrl + path);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(jsonData);
		}
	};
};
module.exports = RestClient;
