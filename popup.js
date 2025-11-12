// popup.js - Handle popup interactions

document.addEventListener('DOMContentLoaded', () => {
  const injectBtn = document.getElementById('inject-btn');
  const statusDiv = document.getElementById('status');

  injectBtn.addEventListener('click', async () => {
    try {
      // Get the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Check if we're on a pokellector.com page
      if (!tab.url || !tab.url.includes('pokellector.com')) {
        showStatus('Please navigate to a pokellector.com page first!', 'error');
        return;
      }
      
      // Inject the content script
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
      
      showStatus('Download button injected successfully!', 'success');
      
      // Close popup after 2 seconds
      setTimeout(() => {
        window.close();
      }, 2000);
      
    } catch (error) {
      console.error('Injection failed:', error);
      showStatus('Failed to inject button: ' + error.message, 'error');
    }
  });

  /**
   * Show status message to user
   */
  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    
    // Hide after 5 seconds
    setTimeout(() => {
      statusDiv.className = 'status';
    }, 5000);
  }
});
