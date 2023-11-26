// 팝업이 열릴 때 링크 트리를 표시
chrome.storage.managed.get('linkTree', function (data) {
  const linkTree = data.linkTree || [];
  const linkTreeDiv = document.getElementById('linkTree');
  renderLinkTree(linkTree, linkTreeDiv);
});

// 링크 트리를 HTML로 렌더링
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