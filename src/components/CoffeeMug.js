import React, { useState } from "react";

export default function CoffeeMug() {
  const [stain, setStain] = useState(0);
  return (
    <div
      className="coffee-mug"
      onClick={(e) => { e.stopPropagation(); setStain((s) => (s + 1) % 4); }}
      data-testid="coffee-mug"
    >
      <div className="steam"><span/><span/><span/></div>
      <div className="mug-body" />
      <svg
        width="80" height="20" style={{ position: "absolute", left: -8, top: 72, opacity: 0.4 }}
        viewBox="0 0 80 20"
      >
        {[0,1,2,3].map((i) => (
          <ellipse
            key={i}
            cx={20 + i * 14}
            cy={10}
            rx={6 + ((stain + i) % 3) * 2}
            ry={3 + ((stain + i) % 2)}
            fill="#6b4226"
            opacity={i <= stain ? 0.6 : 0}
          />
        ))}
      </svg>
    </div>
  );
}
