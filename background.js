chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
      "title": 'Read on Cubari: %s',
      "contexts": ["selection"],
      "id": "myContextMenuId"
  });
});

const baseUrl = 'https://api.mangadex.org';

async function getMangaID(title) {
  const url = `${baseUrl}/manga?title=${encodeURIComponent(title)}&order[relevance]=desc`;
  const resp = await fetch(url, {
    method: 'GET'
  });
  const data = await resp.json();
  return data.data[0].id;
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  getMangaID(info.selectionText).then(id => chrome.tabs.create({  
      url: "https://cubari.moe/read/mangadex/" + encodeURIComponent(id)
  }));
})