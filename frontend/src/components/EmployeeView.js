import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './EmployeeView.css';

const EmployeeView = (props) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); 
    const [employee, setEmployee] = useState({});
    const { first_name, last_name, email, gender, salary } = employee;


    const load = async () => {
        const id = searchParams.get('id');
        const response = await axios.get('http://localhost:8081/api/emp/employees/'+id);
        setEmployee(response.data)
      }

      useEffect(()=>{
        load();
      }, [])


    return (
        <div className="main-form">
            <h1>View Employee</h1>
            <br />
            <Card className="card">
                <Card.Body>
                    <Form>
                        <Form.Group controlId="first_name" className='mb-4'>
                            <Form.Label>Employee Name</Form.Label>
                            <Form.Control
                                className="input-control"
                                type="text"
                                name="last_name"
                                value={last_name}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group controlId="last_name" className='mb-4'>
                            <Form.Label>Family Name</Form.Label>
                            <Form.Control
                                className="input-control"
                                type="text"
                                name="last_name"
                                value={last_name}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className='mb-4'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                className="input-control"
                                type="text"
                                name="email"
                                value={email}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group controlId="gender" className='mb-4'>
                            <Form.Label>Gender</Form.Label>
                            <Form.Select name="gender" value={gender} disabled >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="salary" className='mb-4'>
                            <Form.Label>Salary</Form.Label>
                            <Form.Control
                                className="input-control"
                                type="number"
                                name="salary"
                                value={salary.$numberDecimal}
                                disabled
                            />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EmployeeView;