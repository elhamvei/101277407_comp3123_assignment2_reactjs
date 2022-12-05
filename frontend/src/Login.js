import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Login.css";

const baseUrl = process.env.REACT_APP_BASE_URL;

export default function Login({authticateAction}) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return userName.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const user = {userName, password}
    try{
      const response = await axios.post(baseUrl + '/api/user/login', user);
      authticateAction();
    }catch(error){
      if(error.response.data && error.response.data.message){
        alert(error.response.data.message);
      }
      console.log(error);
    }
  }

  return (
    <div className="login">
      <Card className="card">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" className="mb-4" controlId="email">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value)
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
            <Button block size="lg" className="loginbtn mb-3" type="submit" disabled={!validateForm()}>
              Login
            </Button>
            <br/>
            <Button variant="outline-success" size="lg" className="loginbtn" onClick={()=> navigate('/signup')} >
              Signup
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );

}