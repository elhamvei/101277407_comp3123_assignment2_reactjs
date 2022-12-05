import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './EmployeeForm.css';

const baseUrl = process.env.REACT_APP_BASE_URL;

const EmployeeForm = (props) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [employee, setEmployee] = useState({
        first_name: props.employee ? props.employee.first_name : '',
        last_name: props.employee ? props.employee.last_name : '',
        email: props.employee ? props.employee.email : '',
        gender: props.employee ? props.employee.gender : 'Male',
        salary: props.employee ? props.employee.salary : ''
    });

    const [errorMsg, setErrorMsg] = useState('');
    const { first_name, last_name, email, gender, salary } = employee;

    const load = async () => {
        
        if (id) {
            const response = await axios.get(baseUrl+'/api/emp/employees/' + id);
            response.data.salary = response.data.salary?.$numberDecimal;
            setEmployee(response.data);
        }
    }

    useEffect(() => {
        load();
    }, [])

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (id) {
            updateEmployee(id);
        }
        else{
            saveEmployee();
        }
    };

    const saveEmployee = async () => {
        const response = await axios.post(baseUrl+'/api/emp/employees', employee);
        navigate('/');
    }

    const updateEmployee = async (id) => {
        const response = await axios.put('http://localhost:8081/api/emp/employees/'+id, employee);
        navigate('/');
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEmployee((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    console.log('id',id);

    return (
        <div className="main-form">
            <h1>{id? 'Update' : 'Add'} Employee</h1>
            <br />
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <Card className="card">
                <Card.Body>
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group controlId="first_name" className='mb-4'>
                            <Form.Label>Employee Name</Form.Label>
                            <Form.Control
                                className="input-control"
                                type="text"
                                name="first_name"
                                value={first_name}
                                placeholder="Enter name of Employee"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="last_name" className='mb-4'>
                            <Form.Label>Family Name</Form.Label>
                            <Form.Control
                                className="input-control"
                                type="text"
                                name="last_name"
                                value={last_name}
                                placeholder="Enter Last Name"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className='mb-4'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                className="input-control"
                                type="text"
                                name="email"
                                value={email}
                                placeholder="Enter Email"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="gender" className='mb-4'>
                            <Form.Label>Gender</Form.Label>
                            <Form.Select name="gender" value={gender} onChange={handleInputChange} >
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
                                value={salary}
                                placeholder="Enter Salary"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="submit-btn">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EmployeeForm;