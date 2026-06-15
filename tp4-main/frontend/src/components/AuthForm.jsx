import React, { useState } from 'react';
import api from '../axiosConfig';

// Ajout de setUserEmail dans les paramètres
const AuthForm = ({ setToken, setUserEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please provide both email and password.');
      return;
    }

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const res = await api.post(endpoint, { email, password });

      if (isLogin) {
        // Sauvegarde du jeton de sécurité
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        
        // SAUVEGARDE DE L'EMAIL DE L'UTILISATEUR CONNECTÉ
        localStorage.setItem('userEmail', email);
        if (setUserEmail) {
          setUserEmail(email);
        }
      } else {
        alert('Inscription réussie. Connectez-vous maintenant.');
        setIsLogin(true);
        setPassword('');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur lors de la connexion.';
      alert(message);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form">
        <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
          <button type="submit">{isLogin ? 'Se connecter' : "S'inscrire"}</button>
        </form>
        <button className="link-button" type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Pas de compte ? Inscrivez-vous' : 'Déjà un compte ? Connectez-vous'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
