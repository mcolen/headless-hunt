chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
    tabs[0].id,
    {code: `
      document.getElementsByClassName('pz-header')[0].style.display = '';
    `});
  chrome.pageAction.setTitle({'tabId': tabs[0].id, title: 'Behead this page!'})
  chrome.pageAction.setPopup({'tabId': tabs[0].id, popup: 'behead.html'})
});

