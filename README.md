# MMM-ReactSample

A MagicMirror² module whose UI is rendered by a React 18 + TypeScript application bundled with Vite. The module loads the pre-built bundle (no separate dev server required at runtime). In dev watch mode it polls the built file and auto‑reloads when it changes.

---

# REMOVE .git BEFORE START PROJECT

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
7. Search all files for `mmm-reactsample` and replace with your new project name (e.g. `mmm-reactclock`). This includes CSS class names, dataset attributes, and any code or documentation references. This ensures consistent naming and avoids conflicts.

Notes:
- Stopping MagicMirror is usually not required; the UI will reload on next cycle, but if issues occur just restart.
- Reinstall (`yarn install`) is unnecessary unless you also change dependencies.
- Rebuild is unnecessary while using the watch build (`yarn dev`). For a fresh production bundle you can still run `yarn build` (optional).

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

Repository: https://github.com/alphaorderly/Magic-Mirror-v2-React-module-template

The repository root IS the module root (no extra nested folder). You have three common options to install:

Option A – Clone directly with desired module name (recommended):
```bash
cd MagicMirror/modules
git clone https://github.com/alphaorderly/Magic-Mirror-v2-React-module-template.git MMM-ReactSample
cd MMM-ReactSample
yarn install
```

Option B – Clone with original repo name then optionally rename:
```bash
cd MagicMirror/modules
git clone https://github.com/alphaorderly/Magic-Mirror-v2-React-module-template.git
cd Magic-Mirror-v2-React-module-template
# (optional) mv Magic-Mirror-v2-React-module-template MMM-ReactSample
yarn install
```

Option C – Develop on separate computer and transfer:
```bash
# On development computer
git clone https://github.com/alphaorderly/Magic-Mirror-v2-React-module-template.git MMM-ReactSample
cd MMM-ReactSample
yarn install
yarn test:dev    # Use standalone testing during development (see Standalone Testing section)
yarn build       # Build production files when ready

# Transfer entire folder to MagicMirror computer
# On MagicMirror computer
mv MMM-ReactSample /path/to/MagicMirror/modules/
# No need to run yarn install if only using built files
```

Custom name? Just replace `MMM-ReactSample` above with your target (ensure it still begins with `MMM-` and update `Module.register(...)` + `config.js`).

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

### Standalone Testing (without MagicMirror) {#standalone-testing}

Test your module independently in a browser without installing it in MagicMirror:

```bash
yarn test:dev    # runs: vite --config vite.config.dev.js (opens browser at localhost:3000)
```

This launches a development server with:
- Hot module replacement for instant feedback
- MagicMirror-like styling simulation
- Mock config data injection for testing config utilities
- Independent testing environment
- No interference with existing `yarn dev` or `yarn build` workflows

The test environment includes a mock config object in `index.html` that simulates MagicMirror's config injection:
```javascript
const testConfig = {
    dev: true,
    updateInterval: 30000,
    testMode: true,
    customMessage: "Hello from config!"
};
```

You can modify this object to test different config scenarios. The config is automatically injected into the React component via `data-config` attribute, allowing you to test your config utilities (`getConfig()`, `ensureConfig()`, etc.) in isolation.

Additional test commands:
```bash
yarn test:build    # Build standalone test version
yarn test:preview  # Preview built test version
```

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

## Automated Release (GitHub Actions)

This repo includes a GitHub Actions workflow that builds and publishes a release when you push a version tag.

Workflow file: `.github/workflows/release.yml`

### How it works
1. Trigger: push a tag that starts with `v` (e.g. `v0.1.0`).
2. The workflow:
  - Checks out the code
  - Installs dependencies via Yarn (with cache)
  - Verifies the tag equals `v<package.json.version>`
  - Type checks + (non‑blocking) lint
  - Runs `yarn build`
  - Zips the minimal module bundle (`MMM-ReactSample.js`, `dist/`, `README.md`, `package.json`, `yarn.lock`, optional `LICENSE`)
  - Creates a GitHub Release and uploads the zip

### Usage
Update the version in `package.json`, commit, create a matching tag, and push it:

```bash
git add package.json
git commit -m "chore: bump version to 0.1.1"
git tag v0.1.1
git push origin main --tags
```

After CI finishes, download the zip from the Release page and drop it into `MagicMirror/modules/` (or rename the folder inside if desired). If you only need runtime files you can skip installing dependencies on the MagicMirror device.

### Common Tag Mistake
If the tag (e.g. `v0.1.2`) does not match `package.json` version (`0.1.1`), the workflow fails fast with a clear message.

### Manual Dispatch
You can also manually run the workflow from the Actions tab (e.g. to re‑publish the same version) but it will still validate the tag.

### 자동 릴리스 빠른 요약 (Korean Quick Guide)

워크플로우는 `v` 로 시작하는 태그를 push 하면 자동으로 실행되어 빌드 후 ZIP 을 Release 에 업로드합니다.

#### 1. 버전 올리기
`package.json` 의 `version` 필드를 수정 (예: 0.1.1 → 0.1.2)

```bash
vim package.json   # 또는 직접 편집
```

수정 후 커밋:
```bash
git add package.json
git commit -m "chore: bump version to 0.1.2"
```

#### 2. 태그 생성 & 푸시
반드시 `v` + 버전 형태로 태그를 만듭니다 (package.json 과 정확히 일치해야 함):
```bash
git tag v0.1.2
git push origin main --tags
```

> mismatch 예: package.json=0.1.2 이지만 `git tag v0.1.3` 를 만들면 CI 에서 즉시 실패.

#### 3. 결과 확인
GitHub → Actions 탭에서 진행 상황 확인 → 끝나면 Releases 탭에 `MMM-ReactSample-v0.1.2.zip` 생성.

#### 4. 배포
Release ZIP 다운로드 후 MagicMirror `modules/` 에 압축 해제 (또는 폴더 이름 변경 가능). `dist/` 안에 번들 포함.

#### Patch / Minor / Major 버전 규칙 예시
- 버그fix / 문서: `0.1.2` → `0.1.3`
- 기능 추가(하위호환): `0.1.2` → `0.2.0`
- 깨지는 변경: `0.2.4` → `1.0.0`

#### 빠른 자동화 스니펫
패치 버전 한 단계 올리고 태그 & 푸시 (jq 필요):
```bash
CURRENT=$(jq -r .version package.json)
IFS='.' read -r MA MI PA <<< "$CURRENT"
NEW="$MA.$MI.$((PA+1))"
jq ".version=\"$NEW\"" package.json > package.tmp && mv package.tmp package.json
git add package.json
git commit -m "chore: bump version to $NEW"
git tag v$NEW
git push origin main --tags
```

#### 사전배포(Prerelease) 하고 싶다면?
현재 워크플로는 `v*` 패턴만 허용하므로 `v1.0.0-rc.1` 처럼 하이픈 포함 태그도 동작하지만, zip 이름이 그대로 들어갑니다. 정식 릴리스와 구분하고 싶다면 별도 규칙(예: `prerelease: true`) 을 yml 에 추가하거나 패턴을 세분화 할 수 있습니다.

#### Zip 에 더 넣고 싶을 때
`.github/workflows/release.yml` 의 "Package release zip" 단계에서 `cp` 라인을 수정하여 `LICENSE`, `CHANGELOG.md`, `node_helper.js` 등을 추가 가능.

#### 실패가 날 때 체크리스트
1. Tag vs package.json 버전 불일치?
2. `yarn build` 실패? (Node 20 호환성 / 타입 에러)
3. 린트 단순 경고는 무시되지만 타입 체크는 실패 시 중단.

#### Q: dist/ 를 git 에 커밋해야 하나요?
A: 아니요. CI 가 빌드하여 포함된 zip 을 생성하므로 커밋 불필요. `.gitignore` 에 이미 제외.

필요 시 다국어(영/한) 분리 섹션으로 재구성할 수도 있습니다.


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

## Accessing Module Config in React

The MagicMirror module injects its `config` object into the root `<div>` via `data-config` (JSON string). A helper file `src/config.ts` exposes typed utilities:

Exports (preferred names):
- `ModuleConfig` (interface)
- `getConfigRoot()` – first root element (`HTMLElement | null`)
- `getConfig()` – parse current instance config (`ModuleConfig | null`)
- `ensureConfig()` – cached version of `getConfig()` (returns same object on subsequent calls)
- `getAllConfigs()` – for multiple module instances on the same page

### Single Instance Example (`App.tsx`)
```ts
import { ensureConfig } from './config';

const cfg = ensureConfig() || {};
// Example usage
const isDev = !!cfg.dev;
```

### Direct (non‑cached) Access
```ts
import { getConfig } from './config';
const cfg = getConfig(); // parses each call
```

### Multiple Instances
```ts
import { getAllConfigs } from './config';
getAllConfigs().forEach(({ root, config }) => {
  console.log('Instance root id:', root.id, 'config:', config);
});
```

### Defensive Fallback
```ts
import { ensureConfig } from './config';
const cfg = ensureConfig() ?? { updateInterval: 60000 };
```

If you rename the module and prefix, the utilities will still work as long as the root keeps the class `mmm-reactweather-root` or you adjust queries inside `config.ts` accordingly.

## Performance Tips

- Keep rendered component tree small.
- Offload heavy network / CPU tasks to a future `node_helper.js`.
- Batch or debounce frequent updates.

## Extending with a Node Helper

Add a `node_helper.js` if you need backend logic (APIs, filesystem, scheduling). Use MagicMirror socket notifications to transfer data to the front-end, then integrate with React state (e.g. via a simple event or global store).

## Troubleshooting

| Issue | Likely Cause | Fix |
|-------|--------------|-----|
| Edits not appearing | Not running watch build OR dev=false | Run `yarn dev` and set `dev: true` |
| Slow reload | Large `updateInterval` | Lower to e.g. 5000 |
| 404 dist assets | Build not produced | Run `yarn build` or ensure watch finished |
| Missing styles | CSS not emitted / stale | Delete `dist/` then rebuild |

## License

MIT
