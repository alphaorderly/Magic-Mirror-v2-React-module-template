# MMM-ReactClock

Multi‑timezone clock module for MagicMirror². UI is a pre‑built React 18 + TypeScript + Vite bundle (`dist/index.js`, `dist/index.css`). No dev server needed at runtime.

## Why Use the Release Assets?
Download the latest release (zip/tar) and drop it into `MagicMirror/modules/` to avoid installing Node.js build dependencies on your Mirror device. Release bundles already contain the compiled `dist/` files.

## Quick Install (Recommended)
1. Go to the GitHub Releases page.
2. Download the latest `MMM-ReactClock` archive.
3. Extract to: `MagicMirror/modules/MMM-ReactClock` (folder name must match; case sensitive).
4. (Optional) Remove `.git` if present to keep your main repo clean.
5. Add config (see below) and restart / refresh MagicMirror.

No `yarn install` required when using release assets.

## From Source (Alternative)
```bash
cd MagicMirror/modules
git clone <repo-url> MMM-ReactClock
cd MMM-ReactClock
yarn install
yarn build   # produces dist/index.js & dist/index.css
```

## Features
- Primary timezone clock (seconds update every 1s)
- Additional world timezones (updates each minute)
- Auto reload in dev via bundle polling (`config.dev = true`)
- Tailwind CSS styling

## Configuration (config.js)
```js
{
  module: 'MMM-ReactClock',
  position: 'top_right',
  config: {
    dev: false,                 // true only while developing locally
    updateInterval: 60 * 1000,  // poll interval for dev auto‑reload
    primary: 'America/New_York',
    others: ['Asia/Seoul', 'Europe/London']
  }
}
```

## Development (If You Want to Modify)
```bash
yarn dev       # watch build -> updates dist/ (used by MagicMirror)
yarn test:dev  # standalone browser (HMR) preview
yarn build     # production bundle
```

## Key Files
- `MMM-ReactClock.js` – MagicMirror wrapper / dev polling
- `src/main.tsx` – React mount
- `src/App.tsx` – Root component
- `src/hooks/useTime.tsx` – Time & timezone hook

## License
MIT
