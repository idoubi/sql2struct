chrome.browserAction.onClicked.addListener(function(activeTab) {
    var url = 'html/sql2struct.html';
    chrome.tabs.create({
        url: url
    });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.act == 'setOptions') {
        localStorage.setItem('sql2struct_options', message.data)
        sendResponse('ok')
    }
    if (message.act = 'getOptions') {
        options = localStorage.getItem('sql2struct_options')
        sendResponse(options)
    }
})