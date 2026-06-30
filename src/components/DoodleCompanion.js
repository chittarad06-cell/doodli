import React, { useEffect, useState } from "react";

export default function DoodleCompanion({ mood }) {
  const [eye, setEye] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 4;
      const dy = (e.clientY / window.innerHeight - 0.5) * 3;
      setEye({ x: dx, y: dy });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const mouth =
    mood === "panic" ? "M 32 64 Q 42 56 52 64" :
    mood === "stress" ? "M 32 62 L 52 62" :
    "M 32 60 Q 42 70 52 60";

  return (
    <div className="doodle-companion doodle-bounce" data-testid="doodle-companion">
      <svg viewBox="0 0 96 110" className="doodle-svg">
        {/* body blob */}
        <path
          d="M 18 38 Q 12 18 30 12 Q 48 4 66 14 Q 84 22 78 44 Q 80 70 60 78 Q 42 90 26 76 Q 10 66 18 38 Z"
          fill="#fbf6e7"
          stroke="#2d2a26"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* eyes */}
        <g className="doodle-blink">
          <ellipse cx={36 + eye.x} cy={40 + eye.y} rx="4" ry="5" fill="#2d2a26"/>
          <ellipse cx={58 + eye.x} cy={40 + eye.y} rx="4" ry="5" fill="#2d2a26"/>
          <circle cx={37 + eye.x} cy={38 + eye.y} r="1.2" fill="#fff"/>
          <circle cx={59 + eye.x} cy={38 + eye.y} r="1.2" fill="#fff"/>
        </g>
        {/* cheeks */}
        <circle cx="26" cy="54" r="3" fill="#ffb6c1" opacity="0.7"/>
        <circle cx="68" cy="54" r="3" fill="#ffb6c1" opacity="0.7"/>
        {/* mouth */}
        <path d={mouth} stroke="#2d2a26" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* legs */}
        <path d="M 30 84 L 28 96 L 34 96" stroke="#2d2a26" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 62 84 L 64 96 L 58 96" stroke="#2d2a26" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {mood === "panic" && (
          <text x="74" y="20" fontFamily="Caveat, cursive" fontSize="20" fill="#d94e4e">!!</text>
        )}
      </svg>
    </div>
  );
}
