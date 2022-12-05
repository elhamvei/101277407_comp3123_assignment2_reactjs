import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import "./Login.css";

export default function Login({authticateAction}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    authticateAction();
  }

  return (
    <div className="login">
      <Card className="card">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" className="mb-4" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </Form.Group>
            <Form.Group size="lg" className="mb-4" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button block size="lg" className="loginbtn" type="submit" disabled={!validateForm()}>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );

}