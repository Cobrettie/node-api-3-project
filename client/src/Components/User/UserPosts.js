import React, { useEffect, useState } from 'react';
import axios from 'axios';

function logError(err) {
  return console.log('Error: ', err);
}

export default function UserPosts(props) {
  console.log('user posts props', props);
  const [loading, setLoading] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getUserPosts(1)
  }, [])

  function getUserPosts(id) {
    // setLoading(true)
    return (
      axios.get(`http://localhost:5000/api/users/${id}/posts`)
        .then(response => {
          console.log(response)
          setUserPosts(response.data)
          // setLoading(false)
        })
        .catch(err => {
          logError(err);
        })
    )
  }

  return (
    <div>
      {userPosts.map(post => {
        return (
          <div key={post.id}>
            <p>{post.text}</p>
          </div>
        )
      })}
    </div>
  )
}