chrome.runtime.onInstalled.addListener((e) => {
    console.log('sql2struct installed', e)
    chrome.tabs.create({
        url: 'index.html'
    });
});

chrome.action.onClicked.addListener(tab => {
    console.log('sql2struct clicked', tab)
    chrome.tabs.create({
        url: 'index.html'
    });
});

