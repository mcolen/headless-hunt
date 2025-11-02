# headless-hunt

A Chrome extension to toggle header visibility on NY Times crosswords and puzzles.

## Features

* Toggle header visibility on NY Times crossword and puzzle pages.
* Icon is automatically enabled on NYT puzzle pages and disabled (grayed out) everywhere else.
* Keyboard shortcut: `Alt+Shift+H`

## Installation

1.  Download this repository as a ZIP and extract it.
2.  Go to `chrome://extensions/`.
3.  Enable "Developer mode" (top right).
4.  Click "Load unpacked" and select the extension folder.

## Usage

Click the scythe icon or press `Alt+Shift+H` to toggle the header.

Customize the keyboard shortcut at `chrome://extensions/shortcuts`.

## How It Works

Injects a small CSS stylesheet into the page and toggles a class on the `<body>` element to hide the `.pz-header`. No permanent page modifications.

## Troubleshooting

* **Icon is grayed out?** This is intentional. The extension only activates on NY Times crossword or puzzle pages.
* **Shortcut not working?** Check `chrome://extensions/shortcuts` for conflicts.

## License

MIT
