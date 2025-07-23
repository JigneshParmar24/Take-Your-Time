import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import dayjs from 'dayjs';
import DateDisplayCanvas from './components/DateDisplayCanvas'

function App() {

  const [currentDate, setCurrentDate] = useState(new Date());

  const goToNextDay = () => {
    setCurrentDate(dayjs(currentDate).add(1, 'day').toDate());
  };

  const goToPreviousDay = () => {
    setCurrentDate(dayjs(currentDate).subtract(1, 'day').toDate());
  };

  return (
    <>
      <DateDisplayCanvas date={currentDate} />

      <div className="controls">
        <button onClick={goToPreviousDay}>Previous Day</button>
        <button onClick={goToNextDay}>Next Day</button>
      </div>
      <TaskList />
    </>
  )
}

export default App
