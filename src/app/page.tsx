'use client'
import React, { useState } from 'react';
import Task from '@/app/components/Task';
import * as Types from '@/app/components/Types';

export default function Home() {
  const [tasks, setTasks] = useState<Types.TaskProps[]>([]);
  const [inputValue, setInputValue] = useState('');

  function randomId() {
    return Math.floor(Math.random() * 1000);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, {
        taskId: randomId(),
        text: inputValue,
        category: Types.Category.GENERAL
      }]);
      setInputValue('');
    }
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.taskId !== taskId));
  };

  const handleUpdateTask = (updatedTask: Types.TaskProps) => {
    setTasks(tasks.map(task => task.taskId === updatedTask.taskId ? updatedTask : task));
  };

  return (
    <main className="min-h-screen border-2">
      <div className="todo-list">
        <h1 className="flex items-center justify-center text-2xl mt-5">To-do list</h1>
        <div>
          <div className="flex items-center justify-center my-8">
            <input
              id="todo-list-input"
              className="rounded mr-4 text-black px-2 h-8 outline-none"
              type="text"
              name="add-task"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              id="todo-list-button"
              className="outline outline-1 rounded px-3 py-1"
              onClick={handleAddTask}
            >
              Add task
            </button>
          </div>
          <ul id="todo-list-ul" className="my-8 space-y-3">
            {tasks.slice().reverse().map((task, index) => (
              <Task
                key={index}
                {...task}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
              />
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
