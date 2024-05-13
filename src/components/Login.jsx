import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from './../auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Call login function from auth.js
    const success = login(username, password);
    if (success) {
      // Redirect to dashboard or any other page
      window.location.href = '/dashboard'; // Redirect to dashboard page
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="h-screen bg-cover" style={{backgroundImage: `url('../src/assets/images/heart-day.jpg')`}}>
      <div className="flex justify-center items-center h-full bg-white bg-opacity-90">
        <div className="text-center">
            <Link to="/" className="text-5xl font-bold mb-8">Deaths from Cardiovascular Diseases and Types</Link>
            <h2 className="text-3xl font-semibold mb-4 mt-8">Login</h2>
            <input className="w-64 py-2 px-4 mx-2 mb-4 rounded border" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className="w-64 py-2 px-4 mx-2 mb-4 rounded border" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg" onClick={handleLogin}>Login</button>
        </div>

        <div className='bg-red-500'>
          <h2 className="text-center">Login Credentials</h2>
          <div>
            <p>
              <em>Username</em> : Admin
            </p>
            <p>
              <em>Password</em> : password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
