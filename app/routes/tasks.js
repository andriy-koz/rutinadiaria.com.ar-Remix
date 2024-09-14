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
    try {
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
        const createdTask = await response.json();
        setTasks([...tasks, createdTask]);
        setNewTask("");
      } else {
        alert("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("An error occurred while adding the task.");
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
    <div>
      <h1>Task Manager</h1>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder='New task'
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.description}{" "}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
