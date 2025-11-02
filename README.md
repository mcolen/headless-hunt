# headless-hunt

A Chrome extension to toggle header visibility on NY Times crosswords and puzzles.

## Features

- Toggle header visibility on NY Times crossword and puzzle pages
- Keyboard shortcut: `Alt+Shift+H`
- Stardew Valley scythe icon 🌾

## Installation

1. Download this repository as a ZIP and extract it
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked" and select the extension folder

## Usage

**Click the scythe icon** or press **`Alt+Shift+H`** to toggle the header.

Customize the keyboard shortcut at `chrome://extensions/shortcuts`

## How It Works

Toggles the `display` CSS property of the `.pz-header` element. No permanent page modifications.

## Troubleshooting

- **Shortcut not working?** Check `chrome://extensions/shortcuts` for conflicts
- **Not toggling?** Make sure you're on a NY Times crossword or puzzle page
- **Icon missing?** Reload the extension at `chrome://extensions/`

## License

MIT
