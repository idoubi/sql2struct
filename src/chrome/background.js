chrome.runtime.onInstalled.addListener((e) => {
  chrome.tabs.create({
    url: 'index.html',
  })
})

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({
    url: 'index.html',
  })
})
