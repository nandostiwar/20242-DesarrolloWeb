import React, { useState } from "react";

function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState({});

  const handleLogin = (event) => {
    event.preventDefault();

    if (users[username] && users[username] === password) {
      setIsLoggedIn(true);
      alert("Login successful!");
    } else {
      alert("Invalid username or password.");
    }
  };

  const handleCreateUser = () => {
    if (username && password) {
      setUsers({ ...users, [username]: password });
      alert("User created successfully!");
      setUsername("");
      setPassword("");
    } else {
      alert("Please enter a valid username and password.");
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Username: </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <button onClick={handleCreateUser}>Create User</button>
        </div>
      ) : (
        <h2>Welcome, {username}!</h2>
      )}
    </div>
  );
}

export default login;
