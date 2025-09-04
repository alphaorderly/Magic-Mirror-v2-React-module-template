import React, { useState, useEffect } from "react";

import { ensureConfig } from "./config";

export default function App(): JSX.Element {
  const [now, setNow] = useState<Date>(() => new Date());
  const config = ensureConfig();

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mmm-reactsample-app space-y-1">
      <h2>React Sample</h2>
      <p className="text-lg tracking-wide">{now.toLocaleTimeString()}</p>
      
      {config && (
        <div className="mt-4 text-sm opacity-75">
          <div>Dev Mode: {config.dev ? 'ON' : 'OFF'}</div>
          <div>Update Interval: {config.updateInterval}ms</div>
          {typeof config.customMessage === 'string' && <div>Message: {config.customMessage}</div>}
          {!!config.testMode && <div>🧪 Test Mode Active</div>}
        </div>
      )}
    </div>
  );
}
