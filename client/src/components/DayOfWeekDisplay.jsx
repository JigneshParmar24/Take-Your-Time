import React from 'react';
import dayjs from 'dayjs';
import './DayOfWeekDisplay.css'; 

function DayOfWeekDisplay({ date, OnchangeWeek}) {
  // Get the three-letter day abbreviation (e.g., "mon", "tue")
  const dayAbbreviation = dayjs(date).format('ddd').toLowerCase();
  
  const imageSrc = `/days/${dayAbbreviation}.png`;

  return (
    <div className="day-of-week-container" onClick={() => OnchangeWeek(true)}>
      <img src={imageSrc} alt={dayAbbreviation} />
    </div>
  );
}

export default DayOfWeekDisplay;