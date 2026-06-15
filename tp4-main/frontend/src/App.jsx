import React, { useState, useEffect } from 'react';
import api from './axiosConfig';
import AuthForm from './components/AuthForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // ÉTAPE 1 : Lire l'email directement depuis le localStorage au démarrage
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  // ÉTAPE 2 : Écouter les changements de session
  useEffect(() => {
    if (!token) {
      setUserEmail('');
      localStorage.removeItem('userEmail');
      return;
    }

    // Si le token existe mais pas l'email, on essaie de le récupérer une fois
    if (!userEmail) {
      const stockementLocal = localStorage.getItem('userEmail');
      if (stockementLocal) {
        setUserEmail(stockementLocal);
      }
    }
  }, [token, userEmail]);

  // Chargement des tâches
  useEffect(() => {
    if (!token) {
      setTasks([]);
      return;
    }

    setLoading(true);
    api
      .get('/tasks')
      .then((res) => setTasks(res.data))
      .catch(() => {
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
      })
      .finally(() => setLoading(false));
  }, [token]);

  // ÉTAPE 3 : Nettoyer l'email à la déconnexion
  const logout = () => {
    setToken('');
    setUserEmail('');
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setTasks([]);
  };

  return (
    <div className="App">
      {!token ? (
        // On passe setUserEmail au formulaire pour qu'il puisse l'enregistrer au login
        <AuthForm setToken={setToken} setUserEmail={setUserEmail} />
      ) : (
        <div className="container">
          <header className="header">
            <div>
              <h1>Ma To-Do List</h1>
              {/* Affichage de la phrase exacte demandée */}
              <p className="user-welcome">
              Salut {userEmail || "l'utilisateur connecté"}
              </p>
            </div>
            <button className="secondary-button" onClick={logout}>
              Déconnexion
            </button>
          </header>
          <TaskForm setTasks={setTasks} />
          {loading ? <p>Chargement des tâches...</p> : <TaskList tasks={tasks} setTasks={setTasks} />}
        </div>
      )}
    </div>
  );
}

export default App;
