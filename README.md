# Pokémon Card Downloader - Chrome Extension

A Chrome extension that allows you to easily download Pokémon card images from [Pokellector.com](https://www.pokellector.com/).

## 🎯 Features

- **Automatic Button Injection**: Automatically adds a download button to Pokémon card pages on Pokellector.com
- **One-Click Downloads**: Download high-quality Pokémon card images with a single click
- **Smart File Naming**: Automatically names files based on the card information
- **Visual Feedback**: Shows notifications when downloads start
- **Manual Injection**: Popup interface for manual button injection if needed

## 📦 Installation

### Install from Source (Developer Mode)

1. **Clone or download this repository** to your local machine

2. **Open Chrome** and navigate to:
   ```
   chrome://extensions/
   ```

3. **Enable Developer Mode** (toggle in the top-right corner)

4. **Click "Load unpacked"** and select the `pokellector_downloader` folder

5. The extension icon should now appear in your Chrome toolbar!

## 🚀 Usage

### Automatic Method (Recommended)

1. Navigate to any Pokémon card page on [Pokellector.com](https://www.pokellector.com/)
   - Example: https://www.pokellector.com/EX-FireRed-LeafGreen-Expansion/Charmander-Card-57

2. A **"⬇ Download Card"** button will automatically appear in the top-right corner of the page

3. Click the button to download the card image

4. The image will be saved to your default downloads folder in a `pokemon_cards/` subdirectory

### Manual Method

If the button doesn't appear automatically:

1. Click the **extension icon** in your Chrome toolbar

2. Click the **"📥 Inject Download Button"** button in the popup

3. The download button will appear on the page

## 📁 File Structure

```
pokellector_downloader/
├── manifest.json          # Extension configuration (Manifest V3)
├── content.js            # Injects download button and detects card images
├── background.js         # Handles download requests via Chrome API
├── popup.html            # Extension popup UI
├── popup.js              # Popup functionality
├── styles.css            # Button and notification styling
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This file
```

## 🔧 How It Works

1. **Content Script** (`content.js`):
   - Scans the page for the main Pokémon card image using CSS selectors
   - Injects a styled download button into the page
   - Extracts card information for smart file naming

2. **Background Service Worker** (`background.js`):
   - Receives download requests from the content script
   - Uses Chrome's Downloads API to save images
   - Organizes files into `pokemon_cards/` folder

3. **Popup** (`popup.html`, `popup.js`):
   - Provides a manual injection option
   - Shows extension information

## 🎨 Customization

### Change Download Location

Edit `background.js` line 9 to customize the download folder:

```javascript
filename: `pokemon_cards/${message.filename}`,  // Change 'pokemon_cards' to your preferred folder
```

### Enable "Save As" Dialog

Edit `background.js` line 10:

```javascript
saveAs: true  // Change to true to prompt user for save location
```

### Modify Button Styling

Edit `styles.css` to customize the button appearance, position, colors, etc.

## 🛠️ Technical Details

- **Manifest Version**: V3
- **Permissions Used**:
  - `activeTab` - Access to current tab
  - `downloads` - Download files
  - `scripting` - Inject content script
  - `host_permissions` - Access to pokellector.com domains

- **Browser Support**: Chrome/Chromium-based browsers (Chrome, Edge, Brave, etc.)

## 🐛 Troubleshooting

### Button doesn't appear
- Make sure you're on a Pokémon card page (not a set list or homepage)
- Try using the manual injection from the popup
- Check the browser console (F12) for error messages

### Download fails
- Ensure the extension has download permissions
- Check your browser's download settings
- Verify you have write permissions to the downloads folder

### Icons not showing
- The icons are SVG files saved as .png - they should work, but you can replace them with actual PNG files if needed

## 📝 Notes

- Downloads are saved to your browser's default downloads folder
- Files are organized in a `pokemon_cards/` subdirectory
- The extension only works on pokellector.com domains
- Respects Pokellector's robots.txt and terms of service

## 📄 License

This extension is licensed under the MIT License.

GitHub Repository: [Pokellector_Downloader_Chrome_Extension](https://github.com/citronlegacy/Pokellector_Downloader_Chrome_Extension)

## 🙏 Credits

Card images and data from [Pokellector.com](https://www.pokellector.com/)

Pokémon and Pokémon character names are trademarks of Nintendo.

---

**Disclaimer**: This extension is not affiliated with, sponsored by, or endorsed by Pokellector.com, Nintendo, or The Pokémon Company International Inc.
