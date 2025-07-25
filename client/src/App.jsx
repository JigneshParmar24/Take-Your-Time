import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import './App.css';
import TaskList from './components/TaskList';
import DateDisplayCanvas from './components/DateDisplayCanvas';
import DayOfWeekDisplay from './components/DayOfWeekDisplay';
import WeekDisplay from './components/WeekDisplay';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isWeek, setWeek] = useState(false);
  console.log(dayjs(currentDate))

  const goToNextDay = () => {
    setCurrentDate(dayjs(currentDate).add(1, 'day').toDate());
  };

  const goToPreviousDay = () => {
    setCurrentDate(dayjs(currentDate).subtract(1, 'day').toDate());
  };

  return (
    <>
      {isWeek
        ? (<WeekDisplay currentDate={currentDate} OnchangeWeek = {setWeek} OnchangeDate = {setCurrentDate} />)
        : (<>
          <div className="date-display-container">
            <DateDisplayCanvas date={currentDate} />
            <DayOfWeekDisplay date={currentDate} OnchangeWeek = {setWeek}/>
          </div>
          <div className="dateControls">
            <img src='/arrowLeft.png' className='aleft' onClick={goToPreviousDay}></img>
            <img src='/arrowRight.png' className='aright' onClick={goToNextDay}></img>
          </div>
        </>)}

      <TaskList />

      <div className="tytdiv">
        <img src='/tyt2.png' className='tyt'></img>
      </div>
    </>
  );
}

export default App;