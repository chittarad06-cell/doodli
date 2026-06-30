import React from "react";

export default function DeskLamp({ on, onClick }) {
  return (
    <button
      className={`desk-lamp ${on ? "on" : ""}`}
      onClick={onClick}
      data-testid="desk-lamp"
      aria-label="Toggle desk lamp"
    >
      <span className="lamp-arm" />
      <span className="lamp-shade" />
      <span className="lamp-base" />
    </button>
  );
}
