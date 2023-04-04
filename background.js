chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "0",
    });
    chrome.storage.local.set({ 
        count: "0" 
    })
  });

chrome.runtime.onMessage.addListener(function(message, sender) {
    chrome.action.setBadgeText({
        text: message,
      });
});