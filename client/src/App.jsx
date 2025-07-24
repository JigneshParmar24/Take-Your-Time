import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './App.css';
import TaskList from './components/TaskList';
import DateDisplayCanvas from './components/DateDisplayCanvas';
import DayOfWeekDisplay from './components/DayOfWeekDisplay';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // useEffect(()=>{
  //   const timer = setInterval(()=>{
  //     setCurrentDate(new Date());
  //   }, 1000)

  //   return ()=>clearInterval(timer);
  // }, [])

  const goToNextDay = () => {
    setCurrentDate(dayjs(currentDate).add(1, 'day').toDate());
    console.log("BUTTON CLICKED: New date should be", nextDay);
  };

  const goToPreviousDay = () => {
    setCurrentDate(dayjs(currentDate).subtract(1, 'day').toDate());
    console.log("BUTTON CLICKED: New date should be", prevDay);
  };

  console.log("APP RE-RENDERING with date:", currentDate);
  return (
    <>
      <div className="date-display-container">
        <DateDisplayCanvas date={currentDate} />
        <DayOfWeekDisplay date={currentDate} />
      </div>

      <div className="dateControls">
        <img src='/arrowLeft.png' className='aleft' onClick={goToPreviousDay}></img>
        <img src='/arrowRight.png' className='aright' onClick={goToNextDay}></img>
      </div>

      {/* <div className="controls">
        <button onClick={goToPreviousDay}>Previous Day</button>
        <button onClick={goToNextDay}>Next Day</button>
      </div> */}

      <TaskList />

      <div className="tytdiv">
        <img src='/tyt2.png' className='tyt'></img>
      </div>
    </>
  );
}

export default App;