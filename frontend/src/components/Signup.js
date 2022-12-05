import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const baseUrl = process.env.REACT_APP_BASE_URL;

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== rePassword) {
      alert("Password and repeated password should be same");
      return;
    }
    const user = { email, userName, password };
    try{
    const response = await axios.post(baseUrl + '/api/user/signup', user);
    console.log(response);
    alert("User was created. you can login now :-)");
    navigate('/login');
    }catch(error){
      if(error.response.data && error.response.data.message){
        alert(error.response.data.message);
      }
      console.log(error);
    }

  }


  return (
    <div className="Signup">
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
                required
              />
            </Form.Group>
            <Form.Group size="lg" className="mb-4" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                required
              />
            </Form.Group>
            <Form.Group size="lg" className="mb-4" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group size="lg" className="mb-4" controlId="password">
              <Form.Label>Re-Password</Form.Label>
              <Form.Control
                value={rePassword}
                type="password"
                onChange={(e) => setRePassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button block size="lg" className="Signupbtn" type="submit">
              Signup
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );

}