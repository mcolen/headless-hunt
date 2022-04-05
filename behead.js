chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.scripting.executeScript({
    target: {tabId: tabs[0].id, allFrames: true},
    func: () => {document.getElementsByClassName('pz-header')[0].style.display = 'none';},
  });
  chrome.action.setTitle({'tabId': tabs[0].id, title: 'Re-head this page!'})
  chrome.action.setPopup({'tabId': tabs[0].id, popup: 'rehead.html'})
});

