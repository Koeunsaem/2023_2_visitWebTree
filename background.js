// 초기화: 저장소 초기화
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({ linkTree: [] });
  });
  
  // 링크 정보 업데이트 핸들러
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'updateLinks') {
      const newLinks = request.links;
      chrome.storage.local.get('linkTree', function (data) {
        const existingLinks = data.linkTree || [];
        const updatedLinks = [...existingLinks, { parent: null, children: newLinks }];
        chrome.storage.local.set({ linkTree: updatedLinks });
      });
    }
  });