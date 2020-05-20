chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
    tabs[0].id,
    {code: `
      document.getElementsByClassName('Header-headerWrapper--LyNEB')[0].style.display = 'none';
      document.getElementsByClassName('Header-headerBuffer--1ka0M Header-displayMessagingBanner--12k9U')[0].style.display = 'none';
    `});
  chrome.pageAction.setTitle({'tabId': tabs[0].id, title: 'Re-head this page!'})
  chrome.pageAction.setPopup({'tabId': tabs[0].id, popup: 'rehead.html'})
});

