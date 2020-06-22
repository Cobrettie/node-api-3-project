import React, { useState } from 'react';
import axios from 'axios';

function logError(err) {
  return console.log('Error: ', err)
}

export default function UserCard(props) {
  const [userPosts, setUserPosts] = useState([]);

  function getUserPosts(id) {
    return (
      axios.get(`http://localhost:5000/api/users/${id}/posts`)
        .then(response => {
          setUserPosts(response.data)
        })
        .catch(err => {
          logError(err);
        })
    )
  }

  return (
    <div onClick={() => getUserPosts(props.user.id)}>
      <p>{props.user.name}</p>
      {userPosts.map(posts => {
        return (
          <p key={posts.id}>  - {posts.text}</p>
        )
      })}
    </div>
  )
}