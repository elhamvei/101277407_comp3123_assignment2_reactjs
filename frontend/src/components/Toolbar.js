import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Toolbar.css';

const Toolbar = ({isAuthenticated, setIsAuthenticated}) =>{
    const navigate = useNavigate();

    return (<header id="nav-wrapper">
    <nav id="nav" className="clr">
        <h2 className="text">Full Stack Development - Employee Management App</h2>
        {isAuthenticated ?<Button variant="outline-warning" className="btn1" onClick={()=>{
            setIsAuthenticated(false);
        }}
        >Logout</Button>:null}
    </nav>
  </header>)
}

export default Toolbar;