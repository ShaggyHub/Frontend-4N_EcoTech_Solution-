import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null); // Track logged-in user

  return (
    <div>
      {!loggedInUser ? (
        <div className="container mt-5">
          <LoginForm setLoggedInUser={setLoggedInUser} />
        </div>
      ) : (
        <Profile user={loggedInUser} />
      )}
    </div>
  );
}

export default App;
