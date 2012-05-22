// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// view creation example
//
var SampleView = require('ui/SampleView');

var win1 = new SampleView();

var win2 = new SampleView();


var tab1 = Titanium.UI.createTab({
	title: 'MyTitle',
    window: win1	
});

var tab2 = Titanium.UI.createTab({
	title: 'MyTitle2',
    window: win2	
});


//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
