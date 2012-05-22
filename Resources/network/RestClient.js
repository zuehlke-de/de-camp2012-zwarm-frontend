function RestClient(){
	var baseUrl = 'http://google.com';
	
	return {
		get: function(path, parserCallback) {
			
			// call HTTP client: 
			var xhr = Ti.Network.createHTTPClient({
				onload: function(e) {
					Ti.API.debug(this.responseText);
					// var jsonObject = JSON.parse(this.responseText);
					// parserCallback(jsonObject);
					parserCallback([
						{title:'Sing along.'},
						{title:'Jump around (3)', hasChild: true},
						{title:'Clap hands...'}
					]);
				},
				onerror: function(e) {
					Ti.API.debug(e.error);
					alert('Error!');
				},
				timeout:5000
			});
			xhr.open('GET', baseUrl + '?q=zuehlke');
			xhr.send();
		}
	};
};
module.exports = RestClient;
