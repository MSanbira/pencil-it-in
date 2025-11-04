# Pencil it in ✏️

A fun Chrome extension that adds an animated cartoon pencil that follows your cursor as you type in text inputs, making form filling more enjoyable!

## Features

- **Animated pencil** that appears when you focus on text inputs
- **Follows your cursor** as you type, matching the exact position in the input field
- **Writing animation** when typing characters
- **Erasing animation** when using Backspace or Delete
- **Customizable** pencil size and color options
- **Smart positioning** that adapts to input padding and styling
- **Auto-hides** when scrolling or hovering over the pencil

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select this directory
5. Start typing in any text input to see the pencil in action!

## How it works

The extension injects CSS and JavaScript into every page. When you focus on a text input, an animated pencil appears and tracks your cursor position in real-time using the `selectionchange` event and text measurement techniques.

## Privacy Policy

**Pencil it in does not collect, store, or transmit any user data.**

### What We Access
- Text input focus events to display the animated pencil
- Cursor position (read locally) to position the pencil animation

### What We Don't Do
- No data collection
- No tracking or analytics
- No form data reading
- No personal information access
- No third-party data sharing

### Storage
User preferences (pencil size, color settings) are stored locally using Chrome's sync storage API and sync across your devices if you're signed into Chrome. This data never leaves Chrome's storage system.

### Contact
For questions or concerns, please open an issue on this repository.
