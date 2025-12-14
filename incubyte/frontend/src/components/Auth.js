// import React, { useState } from 'react';

// function Auth({ onLogin }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('user');
//   const [message, setMessage] = useState('');

//   async function register() {
//     const res = await fetch('http://localhost:5000/api/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password, role })
//     });

//     const data = await res.json();
//     setMessage(data.message || 'Registered');
//   }

//   async function login() {
//     const res = await fetch('http://localhost:5000/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password })
//     });

//     const data = await res.json();
//     if (data.token) {
//       onLogin(data.token, role);
//     } else {
//       setMessage(data.message || 'Login failed');
//     }
//   }

//   return (
//     <div>
//       <h2>Login / Register</h2>

//       <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

//       <select onChange={e => setRole(e.target.value)}>
//         <option value="user">User</option>
//         <option value="admin">Admin</option>
//       </select>

//       <br /><br />

//       <button type="button" onClick={login}>Login</button>
// <button type="button" onClick={register}>Register</button>


//       <p>{message}</p>
//     </div>
//   );
// }

// export default Auth;
import React, { useState } from 'react';
import { apiRequest } from '../services/api';
import sweet1 from '../assets/sweets1.jpg';
import sweet2 from '../assets/sweets2.jpg';
import sweet3 from '../assets/sweets3.jpg';
import './Auth.css';

function Auth({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  async function login() {
    const res = await apiRequest('/auth/login', 'POST', {
      username,
      password
    });
    if (res.token) onLogin(res.token, role);
    else alert(res.message);
  }

  async function register() {
    const res = await apiRequest('/auth/register', 'POST', {
      username,
      password,
      role
    });
    alert(res.message);
  }

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* LEFT IMAGE PANEL */}
        <div className="auth-images">
          <img src={sweet1} alt="sweets" className="big-img" />
          <div className="small-imgs">
            <img src={sweet2} alt="sweet" />
            <img src={sweet3} alt="sweet" />
          </div>
        </div>

        {/* RIGHT LOGIN CARD */}
        <div className="auth-card">
          <h2>Welcome to SweetDelight</h2>
          <p>Manage your sweet shop inventory beautifully 🍬</p>

          <label>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} />

          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

          <label>Account Type</label>
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="user">Standard User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="buttons">
            <button className="register" onClick={register}>Register</button>
            <button className="login" onClick={login}>Login</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Auth;
