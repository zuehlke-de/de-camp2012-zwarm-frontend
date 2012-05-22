function InitView() {
	
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	var label1 = Titanium.UI.createLabel({
		color:'#000',
		text:'Tralala',
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto'
	});
	
	self.add(label1);
	
	return self;
	
};

module.exports = InitView;