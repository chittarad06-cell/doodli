import React from "react";

export default function Plant({ tasksCompleted }) {
  const growth = Math.min(1, 0.4 + tasksCompleted * 0.08);
  return (
    <div className="plant" data-testid="plant" style={{ transform: `scale(${growth})`, transformOrigin: "bottom" }}>
      <svg viewBox="0 0 64 96" width="100%" height="100%">
        {/* pot */}
        <path d="M 14 68 L 50 68 L 46 92 L 18 92 Z" fill="#a05c3b" stroke="#5a2e1a" strokeWidth="1.5"/>
        <rect x="12" y="64" width="40" height="6" fill="#b56843" stroke="#5a2e1a" strokeWidth="1.5"/>
        {/* stem */}
        <path d="M 32 68 Q 30 50 32 30" stroke="#3d6b2c" strokeWidth="2.5" fill="none"/>
        {/* leaves */}
        <ellipse cx="22" cy="48" rx="10" ry="6" fill="#5fa44a" transform="rotate(-25 22 48)"/>
        <ellipse cx="42" cy="42" rx="11" ry="6.5" fill="#6ab556" transform="rotate(28 42 42)"/>
        <ellipse cx="28" cy="32" rx="9" ry="5.5" fill="#7fbd6f" transform="rotate(-15 28 32)"/>
        <ellipse cx="38" cy="22" rx="8" ry="5" fill="#8acc7a" transform="rotate(20 38 22)"/>
        {tasksCompleted >= 5 && (
          <>
            <circle cx="32" cy="14" r="3.5" fill="#f7c948"/>
            <circle cx="32" cy="14" r="1.5" fill="#d4a017"/>
          </>
        )}
      </svg>
    </div>
  );
}
