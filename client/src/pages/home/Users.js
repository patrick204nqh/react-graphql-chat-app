import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Col, Image } from 'react-bootstrap'

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username createdAt imageUrl
      latestMessage {
        uuid from to content createdAt
      }
    }
  }
`;

export default function Users({ setSelectedUser }) {
  const { loading, data, error } = useQuery(GET_USERS)

  let usersMarkup;
  if (!data || loading) {
    usersMarkup = <p>loading..</p>
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>no users have joined yet </p>
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map(user => (
      <div
        className="d-flex p-3"
        key={user.username}
        onClick={() => setSelectedUser(user.username)}
      >
        <Image
          src={user.imageUrl}
          roundedCircle
          className="mr-2"
          style={{
            width: 50,
            height: 50,
            objectFit: 'cover'
          }} />
        <div>
          <p className="text-success">{user.username}</p>
          <p className="font-weight-light">
            {user.latestMessage ? user.latestMessage.content : 'You are now connected!'}
          </p>
        </div>
        <p>{user.username}</p>
      </div >
    ))
  }

  return (
    <Col xs={4} className="p-0 bg-secondary">
      {usersMarkup}
    </Col>
  )
}
