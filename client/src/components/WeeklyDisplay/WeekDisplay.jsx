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
            let subW = dayjs(currentDate).subtract(i, 'day').toDate();
            tem.push(subW);
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
        const cur =  parseInt(dayjs(currentDate).format('d'));

        return (<li
            key={uuidv4()} className='weekCon'
            onContextMenu={(event) => { event.preventDefault(); OnchangeDate(item) }}
            onClick={(event) => {
                OnchangeDate(item);
                OnchangeWeek(false);
            }}>

            <motion.div className='nosCon'
                initial={{ y: '-5%' }}
                animate={{ y: 0 }}
                exit={{ y: '-5%' }}
                whileTap={{ scale: 0.9, rotate: 5 }}
                whileHover={{ scale: 1.2, rotate: -7, cursor: "url('/k32.cur'), pointer" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                <img src={d1Src} className='nosImg' /> <img src={d2Src} className='nosImg' />
            </motion.div>
            {(index === cur) && 
            <motion.img 
            src='tracker.png' className='tracker'
            initial={{ x: '50%' }} animate={{ x: 0 }} exit={{ x: '50%' }}
            transition={{type: "spring", stiffness: 300,damping: 25}}/>
            }
            <motion.img
                initial={{ y: '-10%' }}
                animate={{ y: 0 }}
                exit={{ y: '-10%' }}
                whileTap={{ scale: 0.9, rotate: -5 }}
                whileHover={{ scale: 1.2, rotate: 7, cursor: "url('/k32.cur'), pointer" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                src={imageSrc} className='weekImg' />
        </li>)
    })

    const NextWeek = () => {
        let addW = dayjs(week[6]).add(1, 'day').toDate();
        OnchangeDate(addW);
    }

    const PrevWeek = () => {
        let subW = dayjs(week[0]).subtract(1, 'day').toDate();
        OnchangeDate(subW);
    }


    return (
        <motion.ul
            className='weekDis'
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            <motion.img
                whileTap={{ scale: 0.9, rotate: 5 }} whileHover={{ scale: 1.2, rotate: -5, cursor: "url('/k32.cur'), pointer" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                src='/arrowLeft.png' className='leftA' onClick={PrevWeek}>
            </motion.img>
            {cont}
            <motion.img
                whileTap={{ scale: 0.9, rotate: 5 }} whileHover={{ scale: 1.2, rotate: -5, cursor: "url('/k32.cur'), pointer" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                src='/arrowRight.png' className='rightA' onClick={NextWeek}>
            </motion.img>
        </motion.ul >
    )
}

export default WeekDisplay