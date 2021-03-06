chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
    tabs[0].id,
    {code: `
      if (window.location.pathname.startsWith('/puzzles/')) {
        document.getElementsByClassName('pz-header')[0].style.display = 'none';
      } else if (window.location.pathname.startsWith('/crosswords/')) {
        document.getElementsByClassName('Header-headerWrapper--LyNEB')[0].style.display = 'none';
        document.getElementsByClassName('Header-headerBuffer--1ka0M')[0].style.display = 'none';
      }
    `});
  chrome.pageAction.setTitle({'tabId': tabs[0].id, title: 'Re-head this page!'})
  chrome.pageAction.setPopup({'tabId': tabs[0].id, popup: 'rehead.html'})
});

