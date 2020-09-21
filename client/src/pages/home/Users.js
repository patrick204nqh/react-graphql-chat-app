import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Col, Image } from 'react-bootstrap'

import { useMessageDispatch, useMessageState } from '../../context/message';

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
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) => dispatch({
      type: 'SET_USERS',
      payload: data.getUsers
    }),
    onError: err => console.log(err)
  })

  let usersMarkup;
  if (!users || loading) {
    usersMarkup = <p>loading..</p>
  } else if (users.length === 0) {
    usersMarkup = <p>no users have joined yet </p>
  } else if (users.length > 0) {
    usersMarkup = users.map(user => (
      <div
        role="button"
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
