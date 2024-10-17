'use client';

import React, { useState } from 'react';
import styles from './test.module.css';

interface Task {
    id: number;
    title: string;
}

export default function ToDoList(): JSX.Element {
    // Your Test Starts Here
    const [tasks, setTasks] = useState<Task[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>('');

    const addItem = () => {
        if (inputValue.trim() === '') {
            setError('TO DO Item Cannot be empty');
            return;
        }

        const newTask: Task = {
            id: Date.now(),
            title: inputValue,
        };

        setTasks([...tasks, newTask]);
        setInputValue('');
        setError('');
    };

    const deleteTask = (id: number) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    };

    const startEditTask = (id: number) => {
        const taskToEdit = tasks.find((task) => task.id === id);
        if (taskToEdit) {
            setIsEditing(id);
            setEditValue(taskToEdit.title);
        }
    };

    const saveEditTask = (id: number) => {
        if (editValue.trim() === '') {
            setError('Edited TO DO item cannot be empty');
            return;
        }

        const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, title: editValue } : task));

        setTasks(updatedTasks);
        setIsEditing(null);
        setEditValue('');
        setError('');
    };

    return (
        <div className={styles.todoContainer}>
            <h2 className={styles.title}>To Do List</h2>

            {/* Input Area */}
            <div className={styles.inputArea}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter a new To-Do List"
                    className={styles.inputBox}
                />
                <button onClick={addItem} className={styles.addButton}>
                    Add Item
                </button>
            </div>

            {/* Error Handling */}
            {error && <p className={styles.errorMessage}>{error}</p>}

            {/* Task List */}
            <ul className={styles.todoList}>
                {tasks.map((task) => (
                    <li key={task.id} className={styles.taskCard}>
                        {isEditing === task.id ? (
                            <>
                                {/* Editing Input */}
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className={styles.inputBox}
                                />
                                <button onClick={() => saveEditTask(task.id)} className={styles.saveButton}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <div className={styles.taskDetails}>
                                    <p className={styles.taskTitle}>{task.title}</p>
                                </div>
                                <div className={styles.taskActions}>
                                    <button onClick={() => startEditTask(task.id)} className={styles.editButton}>
                                        ✏️
                                    </button>
                                    <button onClick={() => deleteTask(task.id)} className={styles.deleteButton}>
                                        🗑️
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
