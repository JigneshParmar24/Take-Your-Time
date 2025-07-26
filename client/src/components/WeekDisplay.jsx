import { useState, useEffect } from 'react'
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import './WeekDisplay.css'

import { motion } from 'framer-motion';

const WeekDisplay = ({ currentDate, OnchangeWeek, OnchangeDate }) => {

    const [week, setWeek] = useState([]);
    useEffect(() => {
        let tem = [];
        let cur = parseInt(dayjs(currentDate).format('d'));

        for (let i = cur; i > 0; --i) {
            let addW = dayjs(currentDate).subtract(i, 'day').toDate();
            tem.push(addW);
        }
        tem.push(dayjs(currentDate).toDate());
        for (let i = 1; i <= 6 - cur; ++i) {
            let addW = dayjs(currentDate).add(i, 'day').toDate();
            tem.push(addW);
        }

        setWeek(tem);
    }, [currentDate])


    const cont = week.map((item) => {

        const dayAbbreviation = dayjs(item).format('ddd').toLowerCase();
        const imageSrc = `/days2/${dayAbbreviation}.png`;

        const date = parseInt(dayjs(item).format('D'));
        const d1 = parseInt(date / 10), d2 = date % 10;
        const d1Src = `/nos/${d1}.png`;
        const d2Src = `/nos/${d2}.png`;

        return (<li
            key={uuidv4()} className='weekCon'
            onContextMenu={() => OnchangeDate(item)}
            onClick={(event) => {
                event.preventDefault();
                OnchangeDate(item);
                OnchangeWeek(false);
            }}>
            <motion.div className='nosCon'
                whileTap={{ scale: 0.9, rotate: 5 }}
                whileHover={{ scale: 1.2, rotate: -7, cursor: "url('/k32.cur'), pointer" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}>
                <img src={d1Src} className='nosImg' /> <img src={d2Src} className='nosImg' />
            </motion.div>
            <motion.img
                whileTap={{ scale: 0.9, rotate: -5 }}
                whileHover={{ scale: 1.2, rotate: 7, cursor: "url('/k32.cur'), pointer" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            src={imageSrc} className='weekImg' />
        </li>)
    })


    return (
        <motion.ul
            className='weekDis'
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}

            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25
            }}
        >
            {cont}
        </motion.ul>
    )
}

export default WeekDisplay
