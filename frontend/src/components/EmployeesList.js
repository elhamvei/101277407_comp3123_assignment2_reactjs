import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import './EmployeesList.css';

const baseUrl = process.env.REACT_APP_BASE_URL;

const EmployeesList = () => {
  const navigate = useNavigate();

  const [list, setList] = useState([]);

  useEffect(() => {
    loadList();
  }, [])

  const loadList = async () => {
    const response = await axios.get(baseUrl+'/api/emp/employees');
    setList(response.data)
  }

  const deleteEmployee = async (id) => {
    await axios.delete(baseUrl+'/api/emp/employees/'+id);
    loadList();
  }


  return <div className="emplist">
                <Card className="card">
                <Card.Body><>
    <Button variant="primary" className='mb-3' onClick={()=> navigate('/form')}>Add Employee</Button>
    <br />
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) =>
        (<tr>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>{item.email}</td>
          <td>
            <Button variant="info" className='btnspace' onClick={()=>navigate(`/form?id=${item._id}`)}>Update</Button>      
            <Button variant="danger"  className='btnspace' onClick={()=>{
              const response = window.confirm(`Are you want to delete "${item.first_name} ${item.last_name}" ?`);
              if(response){
                deleteEmployee(item._id);
              }
            }}>Delete</Button>
            <Button variant="info" onClick={()=>navigate(`/view?id=${item._id}`)}>View</Button>      

          </td>
        </tr>
        ))}
      </tbody>
    </Table></></Card.Body></Card>
  </div>
}

export default EmployeesList;