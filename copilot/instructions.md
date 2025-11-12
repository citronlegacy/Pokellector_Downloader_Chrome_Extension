# Pokémon Card Downloader - Instructions

## 🎯 Goal

Create a **Chrome Extension** that allows the user to **download the image of a Pokémon card** from a webpage.

### Features

1. Adds a **button to the top of the page** (floating or toolbar button).
2. When clicked, the button **finds and downloads the Pokémon card image** displayed on the current page.
3. Uses the provided example file **`pokellector_source.txt`** (a saved HTML source) to determine where the image is located in the DOM.

---

## 📄 Input Reference

Use the provided file: **`pokellector_source.txt`**

This file contains the saved HTML source of a Pokémon card page from [pokellector.com](https://www.pokellector.com/).
Inspect it to determine the **CSS selector** or **pattern** to identify the main Pokémon card image (e.g. `<img class="card-img" src="...">`).

---

## 📁 Project Structure

```
pokemon-card-downloader/
├── manifest.json
├── content.js
├── background.js
├── popup.html
├── popup.js
├── styles.css
├── INSTRUCTIONS.md
└── pokellector_source.txt
```

---

## ⚙️ Implementation Details

### 1. `manifest.json`

Use **Manifest V3**.

**Required Permissions:**

* `activeTab`
* `downloads`
* `scripting`

**Behavior:**

* Inject `content.js` into all pages on `https://www.pokellector.com/*`.
* Add a browser action (extension icon) with a popup (`popup.html`).

**Example:**

```json
{
  "manifest_version": 3,
  "name": "Pokémon Card Downloader",
  "version": "1.0",
  "description": "Download Pokémon card images from Pokellector.",
  "permissions": ["activeTab", "downloads", "scripting"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "content_scripts": [
    {
      "matches": ["https://www.pokellector.com/*"],
      "js": ["content.js"]
    }
  ]
}
```

---

### 2. `content.js`

This script should:

1. Identify the Pokémon card image using the HTML structure from `pokellector_source.txt`.
2. Insert a floating **"Download Pokémon Card"** button at the top-right of the page.
3. When clicked, retrieve the image URL and send it to the background script for download.

**Example:**

```js
// content.js
const img = document.querySelector("img.card-img"); // selector from pokellector_source.txt

if (img) {
  const button = document.createElement("button");
  button.textContent = "Download Pokémon Card";
  button.id = "download-card-button";

  Object.assign(button.style, {
    position: "fixed",
    top: "10px",
    right: "10px",
    zIndex: 9999,
    padding: "10px 16px",
    backgroundColor: "#ffcb05",
    border: "2px solid #2a75bb",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  });

  document.body.appendChild(button);

  button.addEventListener("click", () => {
    const imageUrl = img.src;
    chrome.runtime.sendMessage({ type: "download", url: imageUrl });
  });
}
```

---

### 3. `background.js`

Listens for messages from `content.js` and uses the Chrome Downloads API to save the image.

**Example:**

```js
// background.js
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "download" && message.url) {
    chrome.downloads.download({
      url: message.url,
      filename: "pokemon_card.jpg"
    });
  }
});
```

---

### 4. `popup.html` and `popup.js`

**Optional** — A simple popup that allows users to manually inject the download button if it doesn’t appear automatically.

**Example (popup.html):**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Pokémon Downloader</title>
    <script src="popup.js"></script>
  </head>
  <body>
    <button id="inject">Inject Download Button</button>
  </body>
</html>
```

**Example (popup.js):**

```js
document.getElementById("inject").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] });
});
```

---

### 5. `styles.css`

Used for additional button or popup styling.

---

## ✅ Expected Behavior

1. Navigate to a Pokémon card page on [pokellector.com](https://www.pokellector.com/).
2. The extension automatically adds a **“Download Pokémon Card”** button.
3. Clicking it downloads the card image as `pokemon_card.jpg`.

---

## 💡 Notes for Copilot

* Use `pokellector_source.txt` to determine the exact image selector.
* Prioritize simplicity and clarity.
* Comment code for readability.
* Ensure full compatibility with **Manifest V3**.

---

## 🧩 Deliverable

Copilot should generate all files listed above, resulting in a fully functional Chrome extension that:

* Injects a button into Pokellector pages.
* Downloads the main Pokémon card image when clicked.
