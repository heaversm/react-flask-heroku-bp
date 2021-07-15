import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [telemetryEnabled, setTelemetryEnabled] = useState(false);

  useEffect(() => {
    fetch("/api/time")
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.time);
        initMetrics();
      });
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
        <a onClick={toggleTelemetry}>
          <img src={logo} className="App-logo" alt="logo" />
        </a>
        <p>The current time is {currentTime}.</p>
        {telemetryEnabled && <p>Telemetry enabled</p>}
      </header>
    </div>
  );
}

export default App;
