/**
 * Utility helpers for the MagicMirror MMM-ReactSample front-end.
 * Provides typed access to the injected root element and its serialized config.
 */

export interface ModuleConfig {
  updateInterval?: number;
  dev?: boolean;
  [key: string]: unknown;
}

export function getConfigRoot(): HTMLElement | null {
  const collection = document.getElementsByClassName('mmm-reactsample-root');
  const el = collection[0];
  return el instanceof HTMLElement ? el : null;
}

export function getConfig(): ModuleConfig | null {
  const root = getConfigRoot();
  if (!root) return null;
  const raw = (root as HTMLElement).dataset?.config;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ModuleConfig;
  } catch (e) {
    console.error('[MMM-ReactSample] Failed to parse data-config JSON', e);
    return null;
  }
}

export function getAllConfigs(): Array<{ root: HTMLElement; config: ModuleConfig | null }> {
  const roots = Array.from(document.getElementsByClassName('mmm-reactsample-root'))
    .filter((el): el is HTMLElement => el instanceof HTMLElement);
  return roots.map(root => {
    let parsed: ModuleConfig | null = null;
    const raw = root.dataset?.config;
    if (raw) {
      try { parsed = JSON.parse(raw) as ModuleConfig; } catch { /* ignore */ }
    }
    return { root, config: parsed };
  });
}

let _cachedConfig: ModuleConfig | null | undefined;
export function ensureConfig(): ModuleConfig | null {
  if (_cachedConfig !== undefined) return _cachedConfig;
  _cachedConfig = getConfig();
  if (_cachedConfig == null) {
    _cachedConfig = null;
  }
  return _cachedConfig;
}
