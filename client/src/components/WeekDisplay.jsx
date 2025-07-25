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


    const cont = week.map((item, index) => {

        const dayAbbreviation = dayjs(item).format('ddd').toLowerCase();
        const imageSrc = `/days2/${dayAbbreviation}.png`;

        const date = parseInt(dayjs(item).format('D'));
        const d1 = parseInt(date / 10), d2 = date % 10;
        const d1Src = `/nos/${d1}.png`;
        const d2Src = `/nos/${d2}.png`;
        // console.log(item);

        return (<li key={uuidv4()} className='weekCon'
            onClick={() => OnchangeDate(item)}
            onContextMenu={(event) => {
                event.preventDefault();
                OnchangeDate(item);
                OnchangeWeek(false);
            }}>
            <div className='nosCon'>
                <img src={d1Src} className='nosImg' /> <img src={d2Src} className='nosImg' />
            </div>
            <img src={imageSrc} className='weekImg' />
        </li>)
    })


    return (
        <motion.ul
            className='weekDis'
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}

            // Replace the old transition with this new spring one
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
