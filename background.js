// --- Injected Function ---

// This function is injected into the page to toggle the header.
// It returns the new state (true if hidden, false if visible).
function toggleHeader() {
  const STYLE_ID = 'headless-hunt-styles';
  const BODY_CLASS = 'headless-hunt-active';

  // 1. Inject the CSS rule if it doesn't already exist.
  // This is done once per page-load.
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
  
  // 3. Report the new state back to the service worker
  return document.body.classList.contains(BODY_CLASS);
}

// --- Click Handler ---

// Fired when the user clicks the extension's icon.
chrome.action.onClicked.addListener(async (tab) => {
  // Run the injected script and wait for its result.
  const results = await chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: toggleHeader,
  });
  
  // Update the badge based on the script's return value.
  if (results && results[0]) {
    const isHidden = results[0].result;
    updateBadge(tab.id, isHidden);
  }
});

// --- Badge Helper ---

// Updates the icon's badge text and color for a specific tab.
function updateBadge(tabId, isHidden) {
  if (isHidden) {
    chrome.action.setBadgeText({ tabId: tabId, text: "ON" });
    chrome.action.setBadgeBackgroundColor({ tabId: tabId, color: "#0D47A1" }); // A dark blue
  } else {
    chrome.action.setBadgeText({ tabId: tabId, text: "" });
  }
}

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

// This function enables or disables the icon for a given tab.
// It also checks the tab's current state to keep the badge in sync.
function updateActionState(tab) {
  // Check if tab still exists (e.g., if it was closed)
  if (chrome.runtime.lastError || !tab) {
    return;
  }
    
  const isValid = checkUrl(
