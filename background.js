// On Extension Icon click, inject scripts in required order
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {file: "jquery-3.2.1.min.js"}, function() {
		chrome.tabs.executeScript(tab.id, {file: "bootstrap.min.js"}, function() {
			chrome.tabs.executeScript(tab.id, {file: "onClick.js"});
		});
	});
});

