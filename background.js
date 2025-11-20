// --- Constants ---

const BODY_CLASS = 'headless-hunt-active';
const STYLE_ID = 'headless-hunt-styles';
const NYT_PUZZLE_URLS = [
  "https://www.nytimes.com/crosswords",
  "https://www.nytimes.com/puzzles"
];

// --- Injected Function ---

// This function is injected into the page to toggle the header.
// It returns the new state (true if hidden, false if visible).
function toggleHeader(className, styleId) {
  // 1. Inject the CSS rule if it doesn't already exist.
  // This is done once per page-load.
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      body.${className} .pz-header {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // 2. Toggle the class on the <body> element
  document.body.classList.toggle(className);
  
  // 3. Report the new state back to the service worker
  return document.body.classList.contains(className);
}

// --- Click Handler ---

// Fired when the user clicks the extension's icon.
chrome.action.onClicked.addListener(async (tab) => {
  // Run the injected script and wait for its result.
  // We pass the constants as arguments to keep the injected function pure.
  const results = await chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: toggleHeader,
    args: [BODY_CLASS, STYLE_ID] 
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
    
  const isValid = checkUrl(tab.url);

  if (isValid) {
    // Enable the icon and set a helpful tooltip
    chrome.action.enable(tab.id);
    chrome.action.setTitle({
      tabId: tab.id,
      title: "Toggle NY Times header"
    });
    
    // Check the tab's current state to set the badge.
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: (className) => document.body.classList.contains(className),
      args: [BODY_CLASS]
    }, (results) => {
      // Don't crash if the script failed (e.g., page still loading)
      if (!chrome.runtime.lastError && results && results[0]) {
        updateBadge(tab.id, results[0].result);
      }
    });

  } else {
    // Disable the icon (it will appear grayed out)
    chrome.action.disable(tab.id);
    chrome.action.setTitle({
      tabId: tab.id,
      title: "Headless Hunt (disabled on this page)"
    });
    // Clear the badge when the tab is not valid
    chrome.action.setBadgeText({ tabId: tab.id, text: "" });
  }
}

// --- Listeners ---

// Fired when the user switches to a different tab
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    updateActionState(tab);
  });
});

// Fired when a tab is updated (e.g., new URL, reload)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // We run this on 'loading' OR 'complete' to update the UI faster.
  // The 'tab' object passed here is sufficient, no need to call chrome.tabs.get again.
  if (changeInfo.status === 'loading' || changeInfo.status === 'complete') {
    updateActionState(tab);
  }
});
