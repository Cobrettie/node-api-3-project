import React from 'react';
import { Route } from 'react-router';

import UsersList from './Components/User/UsersList';
import UserPosts from './Components/User/UserPosts';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Node API 3</h1>
      <p>Stretch</p>
      <Route exact path='/' component={UsersList} />
      <Route 
        path='/:id' 
        render={props => {
          return <UserPosts {...props} />
        }}
      />
    </div>
  );
}

export default App;
