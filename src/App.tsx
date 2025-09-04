import React, { useState, useEffect } from "react";

export default function App(): JSX.Element {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mmm-reactsample-app space-y-1">
      <h2>React Sample</h2>
      <p className="text-lg tracking-wide">{now.toLocaleTimeString()}</p>
    </div>
  );
}
