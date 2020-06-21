import React, { useEffect } from 'react';
import axios from 'axios';

export default function UsersList() {
  useEffect(() => {
    axios.get('http://localhost:5000')
      .then(response => {
        console.log(response)
      })
  }, [])

  return (
    <div>
      <h2>List of Users</h2>
    </div>
  )
}
