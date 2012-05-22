function RestClient(){
	var baseUrl = 'http://ec2-54-247-155-88.eu-west-1.compute.amazonaws.com:4711';
	
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
