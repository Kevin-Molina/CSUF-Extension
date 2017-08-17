chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {allFrames: true, file: "bootstrap-native.js"}, function() {
		chrome.tabs.executeScript(tab.id, {file: "content_script.js"});
	
	});
});
