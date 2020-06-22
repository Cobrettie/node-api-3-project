import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from './UserCard';

function logError(err) {
  console.log('Error: ,', err)
}

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(err => {
        logError(err);
      })
  }, [])

  return (
    <div>
      <h2>List of Users</h2>
      {users.map(item => {
        return (
          <UserCard key={item.id} user={item.name} />
        )
      })}
    </div>
  )
}
