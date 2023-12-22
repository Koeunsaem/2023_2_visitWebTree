chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({ linkTree: [] });
  });

let storedLinks = [];

// 링크 정보 업데이트 핸들러
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if(chrome.storage && chrome.storage.local)
  {
    if (request.action === 'updateLinks') {
      storedLinks = request.links;
      chrome.runtime.sendMessage({ action: 'getLinks', links: storedLinks }); 
    } else if (request.action === 'getLinks') {
      sendResponse({ links: storedLinks });
    }
  } else {
    console.log("chrome.storage.local is not available");
  }   
});

// content script에 연결
chrome.runtime.connectNative('content-script');
