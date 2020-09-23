import React, { useState } from 'react'
import classNames from 'classnames'
import moment from 'moment'
import { Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap'

import { gql, useMutation } from '@apollo/client'
import { useAuthState } from '../../context/auth'

const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎']

const REACT_TO_MESSAGE = gql`
  mutation reactToMessage($uuid: String! $content: String!) {
    reactToMessage(uuid: $uuid, content: $content) {
      uuid
    }
  }
`

export default function Message({ message }) {
  const { user } = useAuthState()
  const sent = message.from === user.username
  const received = !sent
  const [showPopover, setShowPopover] = useState(false)

  const [reactToMessage] = useMutation(REACT_TO_MESSAGE, {
    onError: err => console.log(err),
    onCompleted: data => setShowPopover(false)
  })

  const react = (reaction) => {
    reactToMessage({ variables: { uuid: message.uuid, content: reaction } })
  }

  const reactButton = (
    <OverlayTrigger
      trigger="click"
      placement="top"
      show={showPopover}
      onToggle={setShowPopover}
      transition={false}
      rootClose
      overlay={
        <Popover
          className="rounded-pill"
        >
          <Popover.Content className="d-flex px-0 py-1 align-items-center react-button-popover">
            {reactions.map(reaction => (
              <Button
                variant="link"
                key={reaction}
                onClick={() => react(reaction)}
                className="react-icon-button"
              >
                {reaction}
              </Button>
            ))}
          </Popover.Content>
        </Popover>
      }
    >
      <Button variant="link" className="px-2">
        <i className="far fa-smile"></i>
      </Button>
    </OverlayTrigger>
  )

  return (
    <div className={classNames('d-flex my-3', {
      'ml-auto': sent,
      'mr-auto': received
    })}>
      {sent && reactButton}
      <OverlayTrigger
        placement={sent ? 'right' : 'left'}
        overlay={
          <Tooltip >
            {moment(message.createdAt).format('MMMM DD, YYYY @ h:mm a')}
          </Tooltip>
        }
        transition={false}
      >
        <div className={classNames('py-2 px-3 rounded-pill', {
          'bg-primary': sent,
          'bg-secondary': received
        })}>
          <p key={message.uuid} className={
            classNames({ 'text-white': sent })
          }>
            {message.content}
          </p>
        </div>
      </OverlayTrigger>
      {received && reactButton}
    </div>

  )
}
