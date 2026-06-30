import React from "react";

export default function BooksStack({ onSelect }) {
  return (
    <div className="books-stack" data-testid="books-stack">
      <button className="book b1" onClick={() => onSelect("stats")} data-testid="book-stats">📊 Stats</button>
      <button className="book b2" onClick={() => onSelect("habits")} data-testid="book-habits">🏆 Habits</button>
      <button className="book b3" onClick={() => onSelect("calendar")} data-testid="book-calendar">📅 Calendar</button>
    </div>
  );
}