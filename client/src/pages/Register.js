import React, { useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap';

export default function Register() {
  const [variables, setVariables] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const submitRegisterForm = e => {
    e.preventDefault();
  }

  return (
    <Row className="py-5 bg-white justify-content-center">
      <Col xs={8} md={6} lg={4}>
        <h1 className="text-center">Register</h1>
        <Form onSubmit={submitRegisterForm}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={variables.email}
              onChange={e => setVariables({ ...variables, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={variables.username}
              onChange={e => setVariables({ ...variables, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={variables.password}
              onChange={e => setVariables({ ...variables, password: e.target.value })} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              value={variables.confirmPassword}
              onChange={e => setVariables({ ...variables, confirmPassword: e.target.value })}
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="success" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
