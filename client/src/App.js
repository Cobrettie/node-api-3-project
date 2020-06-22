import React from 'react';
import { Route } from 'react-router';

import UsersList from './Components/User/UsersList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Node API 3</h1>
      <p>Stretch</p>
      <UsersList />

      {/* <Route to='/users/:id' component={} /> */}
    </div>
  );
}

export default App;
