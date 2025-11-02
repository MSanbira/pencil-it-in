# Pencil it in ✏️

A fun Chrome extension that adds an animated cartoon pencil that follows your cursor as you type in text inputs, making form filling more enjoyable!

## Features

- **Animated pencil** that appears when you focus on text inputs
- **Follows your cursor** as you type, matching the exact position in the input field
- **Writing animation** when typing characters
- **Erasing animation** when using Backspace or Delete
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
