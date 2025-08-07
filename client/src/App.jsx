import { useState, useEffect, useRef, use } from 'react';
import dayjs from 'dayjs';
import './App.css';
import TaskList from './components/TaskList';
import DateDisplayCanvas from './components/DateDisplayCanvas';
import DayOfWeekDisplay from './components/DayOfWeekDisplay';
import WeekDisplay from './components/WeekDisplay';
import { motion, AnimatePresence } from 'framer-motion';
import SignUp from './components/SignUP.jsx';
import Login from './components/Login.jsx'
import TYT from './components/TYT.jsx';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import axios from 'axios';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isWeek, setWeek] = useState(false);
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [logout, setLogout] = useState(false);

  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const token = await currentUser.getIdToken();
        const response = await axios.get("http://localhost:8080/auth/user", { headers: { Authorization: `Bearer ${token}` } });
        setUserName(response.data);
        setLogin(false);
        setSignup(false);
        setLogout(true);
      }
      else setLogout(false);
    })

    return () => unsubscribe();
  }, [])

  const goToNextDay = () => {
    setCurrentDate(dayjs(currentDate).add(1, 'day').toDate());
  };

  const goToPreviousDay = () => {
    setCurrentDate(dayjs(currentDate).subtract(1, 'day').toDate());
  };

  return (
    <>
      <AnimatePresence>
        {isWeek
          ? (<WeekDisplay currentDate={currentDate} OnchangeWeek={setWeek} OnchangeDate={setCurrentDate} />)
          : (<motion.div
            key="date-display"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="date-display-container">
              <DateDisplayCanvas date={currentDate} />
              <DayOfWeekDisplay date={currentDate} OnchangeWeek={setWeek} />
            </div>
          </motion.div>)}
      </AnimatePresence>

      {(!isWeek) &&
        (<motion.div className="dateControls"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <motion.img
            whileTap={{ scale: 0.9, rotate: 5 }} whileHover={{ scale: 1.2, rotate: -5, cursor: "url('/k32.cur'), pointer" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            src='/arrowLeft.png' className='aleft' onClick={goToPreviousDay}></motion.img>
          <motion.img
            whileTap={{ scale: 0.9, rotate: 5 }} whileHover={{ scale: 1.2, rotate: -5, cursor: "url('/k32.cur'), pointer" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            src='/arrowRight.png' className='aright' onClick={goToNextDay}></motion.img>
        </motion.div>)
      }

      <TaskList />

      <TYT OnchangeLogin={setLogin} logout = {logout} OnchangeLogout = {setLogout}/>

      <AnimatePresence>
        {signup && <SignUp OnchangeSignup={setSignup} OnchangeLogin={setLogin} />}
        {login && <Login OnchangeSignup={setSignup} OnchangeLogin={setLogin} />}
      </AnimatePresence>
    </>
  );
}

export default App;