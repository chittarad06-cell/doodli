import React from "react";

export default function WindowScenery({ panicMode, dark }) {
  return (
    <section className="window-frame" data-testid="window-scenery">
      <div className="window-sky" style={panicMode ? { filter: "hue-rotate(-25deg) saturate(1.1)" } : undefined} />
      <div className="sun" style={dark ? { background: "radial-gradient(circle, #d8dffb, #5a72a8)", boxShadow: "0 0 60px rgba(180,200,255,0.6)" } : undefined} />
      <div className="cloud" style={{ top: "20%" }} />
      <div className="cloud b" />
      <div className="cloud c" />
      <div className="window-mullion" />
      <div className="window-copy">
        <span className="window-kicker">Doodledesk • Vibe2Ship</span>
        <h1>Plan the day from one cozy desk.</h1>
        <p>Add tasks below. Doodle tracks your panic index live and salvages last-minute days.</p>
      </div>
    </section>
  );
}