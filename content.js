// content.js - Inject download button for Pokémon card images

(function() {
  'use strict';

  // Check if button already exists to prevent duplicates
  if (document.getElementById('pokemon-download-button')) {
    return;
  }

  // Find the main Pokémon card image
  // Based on pokellector_source.txt: <div class="card"><img src="https://den-cards.pokellector.com/...">
  const cardContainer = document.querySelector('.content.cardinfo .card');
  if (!cardContainer) {
    console.log('Pokémon Card Downloader: Card container not found on this page');
    return;
  }

  const cardImage = cardContainer.querySelector('img[src*="den-cards.pokellector.com"]');
  if (!cardImage || !cardImage.src) {
    console.log('Pokémon Card Downloader: Card image not found');
    return;
  }

  console.log('Pokémon Card Downloader: Found card image:', cardImage.src);

  // Create the download button
  const button = document.createElement('button');
  button.id = 'pokemon-download-button';
  button.textContent = '⬇ Download Card';
  button.title = 'Download this Pokémon card image';

  // Add click event listener
  button.addEventListener('click', () => {
    const imageUrl = cardImage.src;
    const imageName = extractCardName(cardImage);
    
    console.log('Downloading card:', imageName);
    
    // Send message to background script to download
    chrome.runtime.sendMessage({
      type: 'download',
      url: imageUrl,
      filename: imageName
    }, (response) => {
      if (response && response.success) {
        showNotification('Download started!');
      } else {
        showNotification('Download failed. Please try again.', true);
      }
    });
  });

  // Append button to the page
  document.body.appendChild(button);

  /**
   * Extract a meaningful filename from the card image
   * Example: "Charmander.RG.57.png" from title or src
   */
  function extractCardName(img) {
    // Try to get name from image title attribute
    const title = img.getAttribute('title');
    if (title) {
      // Title format: "Charmander - EX FireRed & LeafGreen #57"
      const cleanTitle = title.replace(/[^a-zA-Z0-9\s\-]/g, '').replace(/\s+/g, '_');
      return `${cleanTitle}.png`;
    }
    
    // Fallback: extract from URL
    const urlParts = img.src.split('/');
    const filename = urlParts[urlParts.length - 1];
    return filename || 'pokemon_card.png';
  }

  /**
   * Show a temporary notification to the user
   */
  function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.id = 'pokemon-download-notification';
    notification.textContent = message;
    notification.style.backgroundColor = isError ? '#ff4444' : '#44bb44';
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
})();
