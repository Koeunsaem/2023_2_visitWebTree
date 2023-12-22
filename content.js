const port = chrome.runtime.connectNative('content-script');

function extractLinks() {
  const links = Array.from(document.querySelectorAll('a'));
  return links.map(link => {
    return {
      url: link.href,
      text: link.innerText
    };
  });
}

function sendLinksToBackground(links) {
  port.postMessage({ action: 'updateLinks', links });
}

// content script 시작
const links = extractLinks();
sendLinksToBackground(links);

// 백그라운드 스크립트에 데이터를 전달
chrome.runtime.sendMessage({ action: 'updateLinks', links });
