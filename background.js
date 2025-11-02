// This function will be injected into the page
function toggleHeader() {
  const STYLE_ID = 'headless-hunt-styles';
  const BODY_CLASS = 'headless-hunt-active';

  // 1. Inject the CSS rule if it doesn't already exist
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      body.${BODY_CLASS} .pz-header {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // 2. Toggle the class on the <body> element
  document.body.classList.toggle(BODY_CLASS);
}

// Add a listener for when the user clicks the extension icon (action)
chrome.action.onClicked.addListener((tab) => {
  // We only want to run this on the NY Times puzzle pages.
  if (tab.url.startsWith("https://www.nytimes.com/crosswords/") || 
      tab.url.startsWith("https://www.nytimes.com/puzzles/")) {
        
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: toggleHeader,
    });
  } else {
    console.warn('Headless Hunt: Not a NY Times puzzle page.');
  }
});
