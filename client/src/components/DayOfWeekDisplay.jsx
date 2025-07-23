import React from 'react';
import dayjs from 'dayjs';
import './DayOfWeekDisplay.css'; // We'll create this CSS file next

function DayOfWeekDisplay({ date }) {
  // Get the three-letter day abbreviation (e.g., "mon", "tue")
  const dayAbbreviation = dayjs(date).format('ddd').toLowerCase();
  
  // Construct the image path
  const imageSrc = `/days/${dayAbbreviation}.png`;

  return (
    <div className="day-of-week-container">
      <img src={imageSrc} alt={dayAbbreviation} />
    </div>
  );
}

export default DayOfWeekDisplay;