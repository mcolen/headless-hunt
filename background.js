// --- Injected Function ---
// This is the same function as before, which will be injected into the page.
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

// --- Click Handler ---
// This listener is now simpler. We know the icon is only
// clickable on valid pages, so we can just run the script.
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: toggleHeader,
  });
});

// --- URL Validation ---
const NYT_PUZZLE_URLS = [
  "https://www.nytimes.com/crosswords/",
  "https://www.nytimes.com/puzzles/"
];

function checkUrl(url) {
  if (!url) return false;
  return NYT_PUZZLE_URLS.some(puzzleUrl => url.startsWith(puzzleUrl));
}

// --- Icon State Logic ---

// This function enables or disables the icon for a given tab
function updateActionState(tab) {
  // Check if tab still exists
  if (chrome.runtime.lastError || !tab) {
    return;
  }
    
  const isValid = checkUrl(tab.url);

  if (isValid) {
    // Enable the icon and set a helpful tooltip
    chrome.action.enable(tab.id);
    chrome.action.setTitle({
      tabId: tab.id,
      title: "Toggle NY Times header"
    });
  } else {
    // Disable the icon (it will appear grayed out)
    chrome.action.disable(tab.id);
    chrome.action.setTitle({
      tabId: tab.id,
      title: "Headless Hunt (disabled on this page)"
    });
  }
}

// Fired when the user switches to a different tab
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    updateActionState(tab);
  });
});

// Fired when a tab is updated (e.g., new URL, reload)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // We get the tab directly to ensure we have the most up-to-date URL
  chrome.tabs.get(tabId, (updatedTab) => {
    updateActionState(updatedTab);
  });
});
