import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs";
import './TaskList.css'

const TaskList = () => {

    const [newTask, setNewTask] = useState("")
    const [list, setList] = useState([])

    function handleTitleChange(e) {
        setNewTask(e.target.value);
    }

    function createTask(title) {
        return {
            title: title,
            isComplete: false,
            date: dayjs().format('YYYY-MM-DD hh:mm:ss A'),
            id: uuidv4()
        };
    }

    const AddInDaList = () => {
        if (newTask.trim() === "") { return }
        const obj = createTask(newTask);
        setList([...list, obj]);
        setNewTask("");
    }

    const DeleteInDaList = (index) => {
        setList(list.filter((_, i) => i !== index))
    }

    const EditDaList = (index) => {
        setNewTask(list[index].title)
        DeleteInDaList(index);
    }

    const isDone = (i) => {
        let newList = list.map((item, index) => {
            if (index === i) {
                return { ...item, isComplete: !item.isComplete }
            }
            return item
        })
        setList(newList);
    }

    return (
        <>
            <div className="mainContainer">

                <div className="taskContainer">
                    <div className='inputContainer'>
                        <input type='text' value={newTask}
                            onChange={handleTitleChange} placeholder='Enter Da Task' className='taskInput'>
                        </input>
                        <img src='/save.png' className="saveBtn" onClick={AddInDaList}></img>
                    </div>

                    <ul className='listDisplay'>
                        {list.map((item, index) => {
                            return (
                                <div className='taskDisplay' key={item.id}>
                                    <div className={item.isComplete ? 'taskTitle strike' : 'taskTitle'} onClick={() => isDone(index)}>
                                        {item.title}
                                    </div>

                                    <div className="btnHolder">
                                        <img src='/clearData.png' className='deleteBtn' onClick={() => DeleteInDaList(index)}></img>
                                        {/* <button className='editbtn' onClick={() => EditDaList(index)}>edit</button> */}
                                    </div>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </div>


        </>
    )
}

export default TaskList
