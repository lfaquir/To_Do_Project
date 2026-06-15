import React, { useState } from 'react';
import api from '../axiosConfig';

const TaskForm = ({ setTasks }) => {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      alert('Enter a task title before adding.');
      return;
    }

    try {
      const res = await api.post('/tasks', { title: newTask.trim() });
      setTasks((prev) => [res.data, ...prev]);
      setNewTask('');
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de l’ajout de la tâche.');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nouvelle tâche"
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default TaskForm;
