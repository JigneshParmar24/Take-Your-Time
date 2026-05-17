import dayjs from 'dayjs';
import './DayOfWeekDisplay.css';
import { motion } from 'framer-motion';

function DayOfWeekDisplay({ date, OnchangeWeek }) {
  // Get the three-letter day abbreviation (e.g., "mon", "tue")
  const dayAbbreviation = dayjs(date).format('ddd').toLowerCase();

  const imageSrc = `/days/${dayAbbreviation}.png`;

  return (
    <div className="day-of-week-container"
      onClick={() => OnchangeWeek(true)}>
      <motion.img
        whileTap={{ scale: 0.9, rotate: 5 }}
        whileHover={{ scale: 1.2, rotate: -5, cursor: "url('/k32.cur'), pointer" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        src={imageSrc} alt={dayAbbreviation} />
    </div>
  );
}

export default DayOfWeekDisplay;