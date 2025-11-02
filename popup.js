// Toggle header visibility when popup is opened
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  const tabId = tabs[0].id;
  
  chrome.scripting.executeScript({
    target: {tabId: tabId},
    func: toggleHeader,
  }).then(() => {
    // Optional: Update popup message based on result
    console.log('Header toggled successfully');
  }).catch(err => {
    console.error('Failed to toggle header:', err);
    document.getElementById('message').textContent = 'Error!';
    document.getElementById('status').textContent = 'Make sure you\'re on a NY Times page';
  });
});

// This function runs in the context of the page
function toggleHeader() {
  const header = document.querySelector('.pz-header');
  
  if (!header) {
    console.warn('Header element not found');
    return;
  }
  
  // Toggle visibility
  if (header.style.display === 'none') {
    header.style.display = '';
  } else {
    header.style.display = 'none';
  }
}

