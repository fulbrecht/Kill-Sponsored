let killCount = "0"

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: killCount,
    })
  });

chrome.runtime.onMessage.addListener(receiver);

function receiver(message, sender,sendResponse) {

    if(message.countString){
        killCount = message.countString;
        //TODO
        //set max killcount # to +999
        chrome.action.setBadgeText({
            tabId: sender.tab.id,
            text: killCount,
        })
    }

    sendResponse({killCount})

}