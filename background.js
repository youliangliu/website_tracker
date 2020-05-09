console.log('background running');
// Background script
// tabToUrl used to store all the unproductive urls 
var tabToUrl = {};
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Note: this event is fired twice
    // Once with 'changeInfo.status' = "loading" and another time with "complete"
    // we can compare tab.url here with the unproductive urls 
    // send a message to popup.js to publish it
    if(changeInfo.status == 'complete') {
        var hostUrl = getHostname(tab.url);
        if (hostUrl.indexOf('youtube') != -1)   {
            if(!(tab.url in tabToUrl)) {
                tabToUrl[tabId] = tab.url;
                //hardcode to popup.js
                console.log(tabToUrl[tabId]);
            }
        }
        else if (hostUrl.indexOf('facebook') != -1)   {
            
            tabToUrl[tabId] = tab.url;
            console.log(tabToUrl[tabId]);
        }
        else if (hostUrl.indexOf('twitter') != -1)   {
            
            tabToUrl[tabId] = tab.url;
            console.log(tabToUrl[tabId]);
        }
        else    {
        }
    }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    console.log(tabToUrl[tabId]);
    // don't need to compare here as it checks already when you open a new tab
    delete tabToUrl[tabId];
});
function getHostname(url) {
    // Handle Chrome URLs
    if (/^chrome:\/\//.test(url)) { return "invalid"; }
    // Handle files opened in chrome browser
    if (/file:\/\//.test(url)) { return "invalid"; }
    try {
      var newUrl = new URL(url);
      return newUrl.hostname;
    } catch (err) {
      console.log(err);
    }
}



