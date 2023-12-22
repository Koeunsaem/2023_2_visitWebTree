function renderLinkTree(tree, container) {
  const ul = document.createElement('ul');

  tree.forEach(node => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = node.url;
    link.innerText = node.text;
    li.appendChild(link);

    // 자식 노드가 있다면
    if (node.children && node.children.length > 0) {
      renderLinkTree(node.children, li);
    }

    ul.appendChild(li);
  });

  container.appendChild(ul);
}


// 팝업이 열릴 때 링크 트리를 표시
chrome.storage.local.get('linkTree', function (data) {
  const linkTree = data.linkTree || [];
  const linkTreeDiv = document.getElementById('linkTree');
  renderLinkTree(linkTree, linkTreeDiv);
});

document.addEventListener('DOMContentLoaded', function () {
  // 요청하여 백그라운드 스크립트에 데이터를 요청
  chrome.runtime.sendMessage({ action: 'getLinks' }, function (response) {
    const linkTree = document.getElementById('linkTree');

    // 받아온 데이터를 기반으로 팝업 창에 구조화된 내용을 표시
    response.links.forEach(linkData => {
      const template = document.getElementById('li_template').content.cloneNode(true);
      const linkElement = template.querySelector('a');
      linkElement.href = linkData.url;
      linkElement.querySelector('.title').innerText = linkData.text;
      linkElement.querySelector('.pathname').innerText = linkData.url;
      linkTree.appendChild(template);
    });
  });
});