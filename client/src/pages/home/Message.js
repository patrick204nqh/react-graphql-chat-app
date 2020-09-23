import React, { useState } from 'react'
import classNames from 'classnames'
import moment from 'moment'
import { useAuthState } from '../../context/auth'
import { Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap'

const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎']

export default function Message({ message }) {
  const { user } = useAuthState()
  const sent = message.from === user.username
  const received = !sent
  const [showPopover, setShowPopover] = useState(false)

  const react = (reaction) => {
    console.log(`Reacting ${reaction} to message: ${message.uuid}`)
  }

  const reactButton = (
    <OverlayTrigger
      trigger="click"
      placement="top"
      show={showPopover}
      onToggle={setShowPopover}
      transition={false}
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
