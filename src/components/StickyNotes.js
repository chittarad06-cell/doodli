import React from "react";

export default function StickyNotes({ notes }) {
  return (
    <div className="sticky-notes" data-testid="sticky-notes">
      {notes.map((n, i) => (
        <div key={i} className="sticky">{n}</div>
      ))}
    </div>
  );
}
