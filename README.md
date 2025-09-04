# MMM-ReactSample

A MagicMirror² module whose UI is rendered by a React 18 + TypeScript application bundled with Vite. The module loads the pre-built bundle (no separate dev server required at runtime). In dev watch mode it polls the built file and auto‑reloads when it changes.

---

## Features

- React 18 + TypeScript + Vite 5
- Tailwind CSS (see `src/style.css`)
- Single compiled entry: `dist/index.js` (+ `dist/index.css`)
- Lightweight polling auto‑reload while `config.dev = true`
- Clear separation: MagicMirror shell injects a root div + script only

## Requirements

- MagicMirror²
- Node.js 18+ (for Vite 5)

## Installation

```bash
cd MagicMirror/modules
# copy or clone this folder
cd MMM-ReactSample
yarn install
```

## Configuration (config/config.js)

```js
{
  module: 'MMM-ReactSample',
  position: 'top_right',
  config: {
    dev: false,               // true during development (enables polling reload)
    updateInterval: 60 * 1000 // ms between bundle signature checks in dev
  }
}
```

## Development Workflow

Watch build (iterative development):
```bash
yarn dev    # runs: vite build --watch (outputs to dist/)
```
MagicMirror loads `dist/index.js`. The module polls the file every `updateInterval` ms and reloads the window when the signature changes.

Type checking:
```bash
yarn typecheck
```

Lint & format:
```bash
yarn lint
yarn format
```

## Build for Production

```bash
yarn build
```

Outputs placed in `dist/`:
- `dist/index.js`
- `dist/index.css`

They are automatically injected (see `MMM-ReactSample.js`).

## How Dev Auto‑Reload Works

When `config.dev === true`:
1. A timer runs every `config.updateInterval` ms.
2. It fetches `dist/index.js` with a cache‑busting query string.
3. Creates a simple signature (file length + number of certain keywords).
4. If signature differs from the previous one → `location.reload()`.

Lower `updateInterval` (e.g. `5000`) for faster feedback.

## Code Overview

| Path | Purpose |
|------|---------|
| `MMM-ReactSample.js` | MagicMirror module wrapper & polling logic |
| `src/main.tsx` | React root mounting code |
| `src/App.tsx` | Example React component |
| `src/style.css` | Tailwind + module-scoped classes |
| `dist/` | Build output (generated) |

## Styling

Classes are prefixed with `mmm-reactsample-` to avoid conflicts with other modules. If you clone / rename this module you may also rename the prefix (optional but cleaner).

## Performance Tips

- Keep rendered component tree small.
- Offload heavy network / CPU tasks to a future `node_helper.js`.
- Batch or debounce frequent updates.

## Extending with a Node Helper

Add a `node_helper.js` if you need backend logic (APIs, filesystem, scheduling). Use MagicMirror socket notifications to transfer data to the front-end, then integrate with React state (e.g. via a simple event or global store).

## Manual Rename (e.g. MMM-ReactSample → MMM-ReactClock)

If you want to base a new module on this one:
1. Rename directory: `MMM-ReactSample` → `MMM-ReactClock`.
2. Rename file: `MMM-ReactSample.js` → `MMM-ReactClock.js`.
3. Inside that file change: `Module.register("MMM-ReactSample", {` → `Module.register("MMM-ReactClock", {`.
4. In `package.json` update:
  - `name`: `mmm-reactsample` → `mmm-reactclock`
  - `main`: `MMM-ReactSample.js` → `MMM-ReactClock.js`
5. Update README heading / examples.
6. Update `config/config.js` to use the new module name.

Notes:
- Stopping MagicMirror is usually not required; the UI will reload on next cycle, but if issues occur just restart.
- Reinstall (`yarn install`) is unnecessary unless you also change dependencies.
- Rebuild is unnecessary while using the watch build (`yarn dev`). For a fresh production bundle you can still run `yarn build` (optional).

If you also want to rename CSS / dataset prefixes (not required), manually search `mmm-reactsample` or `reactsample` and replace—safe to ignore for single instance usage.

## Troubleshooting

| Issue | Likely Cause | Fix |
|-------|--------------|-----|
| Edits not appearing | Not running watch build OR dev=false | Run `yarn dev` and set `dev: true` |
| Slow reload | Large `updateInterval` | Lower to e.g. 5000 |
| 404 dist assets | Build not produced | Run `yarn build` or ensure watch finished |
| Missing styles | CSS not emitted / stale | Delete `dist/` then rebuild |

## License

MIT
