import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function logError(err) {
  return console.log('Error: ', err)
}

export default function UserCard(props) {
  return (
    <div>
      <Link to={`/${props.user.id}`}>
        <p>{props.user.name}</p>
      </Link>
    </div>
  )
}