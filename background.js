// This function will be injected into the page
function toggleHeader() {
  const header = document.querySelector('.pz-header');
  if (!header) {
    // Using console.warn is helpful for your own debugging
    console.warn('Headless Hunt: Header element not found');
    return;
  }
  
  // Toggle visibility
  if (header.style.display === 'none') {
    header.style.display = '';
  } else {
    header.style.display = 'none';
  }
}

// Add a listener for when the user clicks the extension icon (action)
chrome.action.onClicked.addListener((tab) => {
  // We only want to run this on the NY Times puzzle pages.
  // The host_permissions in the manifest already restrict this,
  // but this check ensures we don't try to run it on
  // chrome://extensions/ or other non-matching pages.
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