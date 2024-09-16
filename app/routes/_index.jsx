import React, { useState, useEffect } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      const token = localStorage.getItem("token");
      const response = await fetch("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTasks(data);
    }

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ description: newTask }),
    });

    if (response.ok) {
      setTasks([...tasks, { description: newTask }]);
      setNewTask("");
    }
  };

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    await fetch(`/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex flex-col items-center gap-16'>
        <h1 className='text-2xl font-bold'>Task Manager</h1>
        <div className='flex flex-col items-center gap-4'>
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder='New task'
            className='p-2 border rounded'
          />
          <button
            onClick={handleAddTask}
            className='bg-blue-500 text-white p-2 rounded'>
            Add Task
          </button>
        </div>
        <ul className='mt-6'>
          {tasks.map((task) => (
            <li
              key={task.id}
              className='flex justify-between items-center mb-2'>
              <span>{task.description}</span>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className='bg-red-500 text-white p-1 rounded'>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
