// On Extension Icon click, inject script
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {file: "jquery-3.2.1.min.js"}, function() {
		chrome.tabs.executeScript(tab.id, {file: "bootstrap.min.js"}, function() {
			chrome.tabs.executeScript(tab.id, {file: "content_script.js"});
		});
	});
});

