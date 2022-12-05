import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import './EmpList.css';

const EmpList = () => {
    const [list,setList] = useState([]);

    useEffect(()=>{
        loadList();
    },[])

    const loadList = async () =>{
        const response = await axios.get('http://localhost:8081/api/emp/employees');
        setList(response.data)
    }


    return <div class="emplist">
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
    {list.map((item)=>
        (<tr>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.email}</td>
            <td></td>
        </tr>
        ))}
        </tbody>
        </Table>
        </div>
}

export default EmpList;