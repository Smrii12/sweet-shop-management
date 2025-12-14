import React, { useState } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import './styles/dashboard.css';

function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  function handleLogin(jwt, userRole) {
    setToken(jwt);
    setRole(userRole);
  }

  return (
    <div>
      {!token ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <Dashboard token={token} role={role} />
      )}
    </div>
  );
}

export default App;
