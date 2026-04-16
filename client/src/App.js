import { useState } from 'react';
import Login from './Login';
import Courses from './Courses';
import Admin from './Admin'; // ✅ ADD THIS
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(false);

  const handleLogin = (receivedToken, userData) => {
    setToken(receivedToken);
    setUser(userData);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <div className={`app ${dark ? 'dark' : ''}`}>
      <header className="navbar">
        <div className="logo">Skill<span>Nest</span></div>
        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={() => setDark(!dark)}
          >
            {dark ? '☀ Light' : '☽ Dark'}
          </button>

          {user && (
            <>
              {user.isAdmin && (
                <span className="admin-badge">Admin</span>
              )}
              <span className="welcome">Hi, {user.name} 👋</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      <main>
        {!token ? (
          <Login onLogin={handleLogin} />
        ) : user?.isAdmin ? (   // ✅ ADMIN ROUTING
          <Admin token={token} />
        ) : (
          <Courses token={token} />
        )}
      </main>
    </div>
  );
}

export default App;