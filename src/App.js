import React, { useState, useEffect } from "react";
import "./App.css";
import gleanLogo from "./glean-logo.png";

function App() {
  const [telemetryEnabled, setTelemetryEnabled] = useState(false);

  useEffect(() => {
    initMetrics();
  }, []);

  async function initMetrics() {
    fetch("/api/init_metrics")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toggleTelemetry();
      });
  }

  const toggleTelemetry = (e, isEnabled = !telemetryEnabled) => {
    fetch(`/api/toggle_telemetry/${isEnabled}`)
      .then((res) => res.json())
      .then((data) => {
        const isEnabled = data.telemetryEnabled === "true"; //convert to bool
        setTelemetryEnabled(isEnabled);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={gleanLogo} className="App-logo" alt="logo" />
        <button className="App-button" onClick={toggleTelemetry}>
          Toggle Telemetry
        </button>
        <p>Telemetry enabled: {telemetryEnabled ? "true" : "false"}</p>
      </header>
    </div>
  );
}

export default App;
