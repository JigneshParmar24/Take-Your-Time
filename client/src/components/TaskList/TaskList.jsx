import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs";
import './TaskList.css'
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'taskList_data';

const loadFromStorage = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

const saveToStorage = (list) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

const TaskList = ({ currentDate }) => {

    const [newTask, setNewTask] = useState("")
    const [list, setList] = useState([])

    // On date change, load tasks for that date from localStorage
    useEffect(() => {
        const targetDate = dayjs(currentDate).format('YYYY-MM-DD');
        const all = loadFromStorage();
        const filtered = all.filter(task => task.date === targetDate);
        setList(filtered);
    }, [currentDate]);

    // Helper: update localStorage with a full new list for the current date
    const persistList = (updatedList) => {
        const targetDate = dayjs(currentDate).format('YYYY-MM-DD');
        const all = loadFromStorage();
        // Remove existing tasks for this date, then add updated ones
        const otherDays = all.filter(task => task.date !== targetDate);
        saveToStorage([...otherDays, ...updatedList]);
    };

    function handleTitleChange(e) {
        setNewTask(e.target.value);
    }

    const AddInDaList = () => {
        if (newTask.trim() === "") return;
        const newObj = {
            title: newTask,
            isComplete: false,
            date: dayjs(currentDate).format('YYYY-MM-DD'),
            id: uuidv4()
        };
        const updated = [...list, newObj];
        setList(updated);
        persistList(updated);
        setNewTask("");
    };

    const DeleteInDaList = (index) => {
        const updated = list.filter((_, i) => i !== index);
        setList(updated);
        persistList(updated);
    };

    const EditDaList = (index) => {
        setNewTask(list[index].title);
        DeleteInDaList(index);
    };

    const isDone = (i) => {
        const updated = list.map((item, index) => {
            if (index === i) return { ...item, isComplete: !item.isComplete };
            return item;
        });
        setList(updated);
        persistList(updated);
    };

    const containerVariants = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    let full = list.map((item, index) => {
        return (
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className='taskDisplay'
                key={item.id}>

                <motion.div
                    whileTap={{ scale: 0.9, rotate: 1 }}
                    whileHover={{ scale: 1.1, rotate: -3, cursor: "url('/k32.cur'), pointer" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={item.isComplete ? 'taskTitle strike' : 'taskTitle'}
                    onClick={() => isDone(index)}>
                    {item.title}
                </motion.div>

                <div className="btnHolder">
                    <motion.img
                        whileTap={{ scale: 0.9, rotate: 1 }}
                        whileHover={{ scale: 1.1, rotate: -6, cursor: "url('/k32.cur'), pointer" }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        src='/clearData.png'
                        className='deleteBtn'
                        onClick={() => DeleteInDaList(index)}></motion.img>
                    {/* <button className='editbtn' onClick={() => EditDaList(index)}>edit</button> */}
                </div>
            </motion.div>
        )
    })

    let empty = <div className='none'>
        <motion.img
            src='/none.png'
            className='noneImg'
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
        </motion.img>
    </div>

    return (
        <>
            <div className="mainContainer">

                <div className="taskContainer">
                    <div className='inputContainer'>
                        <input type='text' value={newTask}
                            onChange={handleTitleChange} placeholder='Enter Da Task' className='taskInput'>
                        </input>
                        <motion.img
                            src='/save.png'
                            className="saveBtn"
                            onClick={AddInDaList}
                            alt="Save Task"
                            whileTap={{ scale: 0.9, rotate: 1 }}
                            whileHover={{ scale: 1.1, rotate: -6, cursor: "url('/k32.cur'), pointer" }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        />
                    </div>

                    <motion.ul
                        variants={containerVariants}
                        initial="initial" animate="animate" exit="exit"
                        className='listDisplay'>
                        {(list.length === 0) ? empty : <AnimatePresence>{full}</AnimatePresence>}
                    </motion.ul>
                </div>
            </div>
        </>
    )
}

export default TaskList