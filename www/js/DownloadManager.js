/*
	CordovaPlugin (Android): Download Manager (Notification Bar Support)
	
	Author: Pierre Jochem - pierrejochem[at]msn.com (@pierrejochem)
	Author: aabilio - aabilio[at]gmail.com (@aabilio)

*/

cordova.define("cordova/plugin/DownloadManager/DownloadManager", function (require, exports, module) {
	var exec = require("cordova/exec");
 	module.exports = {
  		start: function (message, win, fail) {
   			exec(win, fail, "DownloadManager", "start", [message]);
  		},
  		cancel: function (message, win, fail) {
  			exec(win, fail, "DownloadManager", "cancel", [message]);
  		},
  		isdownloading: function (message, win ,fail) {
  			exec(win, fail, "DownloadManager", "isdownloading", [message]);
  		}
 	};
});

var dm = function (action, options, win, fail) {
	var downloader = cordova.require("cordova/plugin/DownloadManager/DownloadManager");
	o = {
		id: options.id || "",
		url: options.url || "",
		filePath: options.filePath || "youraplication",
		fileName: options.fileName || "",
		overwrite: options.overwrite || false,
		useNotificationBar: options.useNotificationBar || true,
		startToast: options.startToast || "Starting download...",
		endToast: options.endToast || "Download end!",
		ticker: options.ticker || "Downloading...",
		notificationTitle: options.notificationTitle || "Downloading...",
		cancelToast: options.cancelToast || "Download canceled!"
	}
	
	if (action == "start") {
		if (o.url == "" ){alert("[ERROR] DownloadManager (JavaScript): URL needed");return -1;}
		downloader.start(o, win, fail);
	} else if (action == "cancel") {
		if (o.id == ""){alert("[ERROR] DownloadManager (JavaScript): ID needed");return -1;}
		downloader.cancel({id: o.id}, win, fail);
	} else if (action == "isdownloading") {
		if (o.id == ""){alert("[ERROR] DownloadManager (JavaScript): ID needed");return -1;}
		downloader.isdownloading({id: o.id}, win, fail);
	} else {
		alert("[ERROR] DownloadManager (JavaScript): Action not supported");
	}
}

if(!window.plugins) window.plugins = {};
window.plugins.downloadmanager = dm;
