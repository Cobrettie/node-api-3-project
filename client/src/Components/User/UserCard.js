import React from 'react';

export default function UserCard(props) {
  console.log(props)
  return (
    <div>
      <p>{props.user}</p>
    </div>
  )
}