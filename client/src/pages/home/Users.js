import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Col, Image } from 'react-bootstrap'
import classNames from 'classnames';

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

export default function Users() {
  const dispatch = useMessageDispatch()
  const { users } = useMessageState()
  const selectedUser = users?.find(u => u.selected === true)?.username

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
    usersMarkup = users.map(user => {
      const selected = selectedUser === user.username
      return (
        <div
          role="button"
          className={
            classNames(
              "user-div d-flex justify-content-center justify-content-md-start p-3",
              { 'bg-white': selected }
            )
          }
          key={user.username}
          onClick={() => dispatch({
            type: 'SET_SELECTED_USER',
            payload: user.username
          })}
        >
          <Image
            src={user.imageUrl || 'https://i.ibb.co/5hSwqj0/patrick-v2-black-bg.png'}
            className="user-image"
          />
          <div className="d-none d-md-block ml-2">
            <p className="text-primary">{user.username}</p>
            <p className="font-weight-light">
              {user.latestMessage ? user.latestMessage.content : 'You are now connected!'}
            </p>
          </div>
        </div >
      )
    })
  }

  return (
    <Col xs={2} md={4} className="p-0 bg-secondary">
      {usersMarkup}
    </Col>
  )
}