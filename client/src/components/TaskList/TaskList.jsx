import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs";
import './TaskList.css'
import { motion, AnimatePresence } from 'framer-motion';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../firebase";
import axios from "axios";

const TaskList = ({ currentDate }) => {

    const [newTask, setNewTask] = useState("")
    const [list, setList] = useState([])

    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const targetDate = dayjs(currentDate).format('YYYY-MM-DD');
                const token = await currentUser.getIdToken();
                const response = await axios.get(
                    `http://localhost:8080/task/list?date=${targetDate}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setList(response.data.data);
            }
        })
        return () => unsubscribe();
    }, [currentDate, list])

    function handleTitleChange(e) {
        setNewTask(e.target.value);
    }

    function createTask(title) {
        const ID = uuidv4();
        if (user) createTaskUser(title, ID);
        return {
            title: title,
            isComplete: false,
            date: dayjs(currentDate).format('YYYY-MM-DD'),
            id: ID
        };
    }

    async function createTaskUser(title, ID) {
        const token = await user.getIdToken(); // 🔹 Get token here

        const taskData = {
            userId: user.uid,
            taskInfo: [{
                title: title,
                isComplete: false,
                date: dayjs(currentDate).format('YYYY-MM-DD'),
                id: ID
            }]
        };

        axios.post("http://localhost:8080/task/new", taskData, {
            headers: { Authorization: `Bearer ${token}` } // 🔹 Add token to headers
        })
            .then(res => {
                console.log("Server Response:", res.data);
            })
            .catch(err => {
                console.error("Error:", err);
            });
    }

    const AddInDaList = () => {
        if (newTask.trim() === "") { return }
        const obj = createTask(newTask);
        setList([...list, obj]);
        setNewTask("");
    }

    // const AddInDaListUser = async () => {
    //     if (newTask.trim() === "") { return }
    //     createTask(newTask);
    //     const targetDate = dayjs(currentDate).format('YYYY-MM-DD');
    //     const token = await currentUser.getIdToken();
    //     const response = await axios.get(
    //         `http://localhost:8080/task/list?date=${targetDate}`,
    //         { headers: { Authorization: `Bearer ${token}` } }
    //     );
    //     setList(response.data.data);
    //     setNewTask("");
    // }

    const DeleteInDaListUser = async (id) => {
        const token = await user.getIdToken();
        await axios.delete(
            `http://localhost:8080/task/del`,
            {
                headers: { Authorization: `Bearer ${token}` },
                data: { id }
            }
        );
    }

    const DeleteInDaList = async (index) => {
        if (user) {
            let ID = list[index].id;
            await DeleteInDaListUser(ID);
        }
        else setList(list.filter((_, i) => i !== index))
    }

    const EditDaList = (index) => {
        setNewTask(list[index].title)
        DeleteInDaList(index);
    }

    const containerVariants = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const isDoneUser = async (id, isCom) => {
        const token = await user.getIdToken();
        await axios.put(
            `http://localhost:8080/task/isDone`,
                { id, isDone: isCom }, 
                {headers: { Authorization: `Bearer ${token}` }}
        );
    }

    const isDone = async (i) => {
        if (user) {
            let ID = list[i].id;
            let isCom = list[i].isComplete;
            await isDoneUser(ID, isCom);
        } else {
            let newList = list.map((item, index) => {
                if (index === i) {
                    return { ...item, isComplete: !item.isComplete }
                }
                return item
            })
            setList(newList);
        }
    }

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
                            // onClick={user ? AddInDaListUser : AddInDaList}
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
