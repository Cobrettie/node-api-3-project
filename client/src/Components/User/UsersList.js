import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from './UserCard';

function logError(err) {
  console.log('Error: ,', err)
}

export default function UsersList() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState();

  function getAllUsers() {
    return (
      axios.get('http://localhost:5000/api/users')
        .then(response => {
          setUsers(response.data);
          // setLoading(false);
        })
        .catch(err => {
          logError(err);
        })
    ) 
  }

  useEffect(() => {
    getAllUsers();
  }, [])

  return (
    <div>
      <h2>List of Users</h2>
      {users.map(item => {
        return (
          <UserCard 
            key={item.id} 
            user={item} 
          />
        )
      })}
    </div>
  )
}
