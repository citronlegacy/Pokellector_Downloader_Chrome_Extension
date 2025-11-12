// background.js - Service worker for handling downloads

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'download' && message.url) {
    console.log('Background: Downloading', message.filename, 'from', message.url);
    
    // Use Chrome Downloads API to save the image
    chrome.downloads.download({
      url: message.url,
      filename: `pokemon_cards/${message.filename}`,
      saveAs: false // Set to true if you want the user to choose location
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        console.error('Download failed:', chrome.runtime.lastError);
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        console.log('Download started with ID:', downloadId);
        sendResponse({ success: true, downloadId: downloadId });
      }
    });
    
    // Return true to indicate async response
    return true;
  }
});

// Optional: Listen for download completion
chrome.downloads.onChanged.addListener((delta) => {
  if (delta.state && delta.state.current === 'complete') {
    console.log('Download completed:', delta.id);
  } else if (delta.state && delta.state.current === 'interrupted') {
    console.error('Download interrupted:', delta.id);
  }
});
